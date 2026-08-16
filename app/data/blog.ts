export interface BlogQuoteOption {
  quote: string
  author: string
  source?: string
}

export interface BlogArticle {
  slug: string
  title: string
  publishedAt: string
  excerpt: string
  featuredQuote: BlogQuoteOption
  content: string
  contentBlocks: BlogContentBlock[]
}

export interface BlogMarkdownBlock {
  type: 'markdown'
  html: string
}

export interface BlogShortcodeBlock {
  type: 'shortcode'
  name: string
}

export type BlogContentBlock = BlogMarkdownBlock | BlogShortcodeBlock

const SHORTCODE_PATTERN = /^\[([A-Z][A-Za-z0-9]+)\]$/

function parsePublishedAt (publishedAt: string) {
  if (publishedAt.includes('T')) {
    return new Date(publishedAt)
  }
  return new Date(`${publishedAt}T00:00:00Z`)
}

const rawBlogFiles = import.meta.glob('../content/blog/*.md', {
  eager: true,
  import: 'default',
  query: '?raw'
}) as Record<string, string>

const REQUIRED_FIELDS = [
  'title',
  'publishedAt',
  'excerpt',
  'featuredQuote',
  'featuredAuthor'
] as const

function getSlugFromPath (path: string) {
  const match = path.match(/\/([^/]+)\.md$/)
  return match ? match[1] : path
}

function stripWrappingQuotes (value: string) {
  const trimmed = value.trim()
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith('\'') && trimmed.endsWith('\''))
  ) {
    return trimmed.slice(1, -1)
  }
  return trimmed
}

function splitFrontmatter (source: string) {
  const normalized = source.replace(/\r\n/g, '\n')
  if (!normalized.startsWith('---\n')) {
    throw new Error('Blog markdown files must begin with frontmatter.')
  }

  const closingIndex = normalized.indexOf('\n---\n', 4)
  if (closingIndex === -1) {
    throw new Error('Blog markdown frontmatter must end with --- on its own line.')
  }

  return {
    frontmatter: normalized.slice(4, closingIndex).trim(),
    body: normalized.slice(closingIndex + 5).trim()
  }
}

function parseFrontmatter (frontmatter: string) {
  const attributes: Record<string, string> = {}

  for (const line of frontmatter.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed) {
      continue
    }

    const separatorIndex = trimmed.indexOf(':')
    if (separatorIndex === -1) {
      throw new Error(`Invalid frontmatter line: ${line}`)
    }

    const key = trimmed.slice(0, separatorIndex).trim()
    const value = stripWrappingQuotes(trimmed.slice(separatorIndex + 1))
    attributes[key] = value
  }

  return attributes
}

function escapeHtml (value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function applyInlineMarkdown (text: string) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
}

function normalizeParagraph (text: string) {
  return text
    .split('\n')
    .map(line => line.trim())
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function renderMarkdownBlock (block: string) {
  const lines = block.split('\n')

  if (/^###\s+/.test(lines[0])) {
    return `<h3>${applyInlineMarkdown(lines[0].replace(/^###\s+/, ''))}</h3>`
  }

  if (/^##\s+/.test(lines[0])) {
    return `<h2>${applyInlineMarkdown(lines[0].replace(/^##\s+/, ''))}</h2>`
  }

  if (/^#\s+/.test(lines[0])) {
    return `<h1>${applyInlineMarkdown(lines[0].replace(/^#\s+/, ''))}</h1>`
  }

  if (lines.every(line => /^>\s?/.test(line))) {
    const quoteLines = lines.map(line => line.replace(/^>\s?/, ''))
    return `<blockquote><p>${applyInlineMarkdown(normalizeParagraph(quoteLines.join('\n')))}</p></blockquote>`
  }

  if (lines.every(line => /^[-*]\s+/.test(line))) {
    const items = lines
      .map(line => `<li>${applyInlineMarkdown(line.replace(/^[-*]\s+/, ''))}</li>`)
      .join('')
    return `<ul>${items}</ul>`
  }

  if (lines.every(line => /^\d+\.\s+/.test(line))) {
    const items = lines
      .map(line => `<li>${applyInlineMarkdown(line.replace(/^\d+\.\s+/, ''))}</li>`)
      .join('')
    return `<ol>${items}</ol>`
  }

  return `<p>${applyInlineMarkdown(normalizeParagraph(block))}</p>`
}

function markdownToHtml (markdown: string) {
  return markdown
    .split(/\n\s*\n/)
    .map(block => block.trim())
    .filter(Boolean)
    .map(renderMarkdownBlock)
    .join('\n')
}

function markdownToContentBlocks (markdown: string) {
  const blocks: BlogContentBlock[] = []
  const buffer: string[] = []

  const flushMarkdownBuffer = () => {
    const source = buffer.join('\n').trim()
    if (!source) {
      buffer.length = 0
      return
    }
    blocks.push({
      type: 'markdown',
      html: markdownToHtml(source)
    })
    buffer.length = 0
  }

  for (const line of markdown.split('\n')) {
    const shortcodeMatch = line.trim().match(SHORTCODE_PATTERN)
    if (shortcodeMatch) {
      flushMarkdownBuffer()
      blocks.push({
        type: 'shortcode',
        name: shortcodeMatch[1]
      })
      continue
    }
    buffer.push(line)
  }

  flushMarkdownBuffer()

  return blocks
}

function parseBlogArticle (path: string, source: string): BlogArticle {
  const slug = getSlugFromPath(path)
  const { frontmatter, body } = splitFrontmatter(source)
  const attributes = parseFrontmatter(frontmatter)

  for (const field of REQUIRED_FIELDS) {
    if (!attributes[field]) {
      throw new Error(`Missing required frontmatter field "${field}" in ${path}`)
    }
  }

  return {
    slug,
    title: attributes.title,
    publishedAt: attributes.publishedAt,
    excerpt: attributes.excerpt,
    featuredQuote: {
      quote: attributes.featuredQuote,
      author: attributes.featuredAuthor,
      source: attributes.featuredSource || undefined
    },
    content: body,
    contentBlocks: markdownToContentBlocks(body)
  }
}

export const blogArticles: BlogArticle[] = Object.entries(rawBlogFiles)
  .map(([path, source]) => parseBlogArticle(path, source))
  .sort((left, right) => parsePublishedAt(right.publishedAt).getTime() - parsePublishedAt(left.publishedAt).getTime())

export function getBlogArticleBySlug (slug: string) {
  return blogArticles.find(article => article.slug === slug)
}

export function getBlogArticleRoutes () {
  return blogArticles.map(article => `/blog/${article.slug}`)
}

export function formatBlogDate (publishedAt: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(parsePublishedAt(publishedAt))
}
