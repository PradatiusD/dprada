function escapeHtml (value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function isSafeLink (href: string) {
  return /^(https?:\/\/|mailto:|#|\/(?!\/)|\.\.?\/)/i.test(href) ||
    (!href.startsWith('//') && !/^[a-z][a-z0-9+.-]*:/i.test(href))
}

function applyInlineMarkdown (text: string) {
  const protectedValues: string[] = []
  const protect = (value: string) => {
    protectedValues.push(value)
    return `\u0000${protectedValues.length - 1}\u0000`
  }

  const escaped = escapeHtml(text)
    .replace(/`([^`]+)`/g, (_, code) => protect(`<code>${code}</code>`))
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
      if (!isSafeLink(href)) {
        return label
      }
      return protect(`<a href="${href}">${label}</a>`)
    })
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/__([^_]+)__/g, '<strong>$1</strong>')
    .replace(/~~([^~]+)~~/g, '<del>$1</del>')
    .replace(/(^|[^\w])\*([^*]+)\*(?!\w)/g, '$1<em>$2</em>')
    .replace(/(^|[^\w])_([^_]+)_(?!\w)/g, '$1<em>$2</em>')

  return escaped.replace(/\u0000(\d+)\u0000/g, (_, index) => protectedValues[Number(index)] as string)
}

function normalizeParagraph (text: string) {
  return text
    .split('\n')
    .map(line => line.trim())
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function isBlockStart (line: string) {
  return /^(#{1,6}\s+|>\s?|[-+*]\s+|\d+\.\s+|```|(?:-{3,}|\*{3,}|_{3,})\s*$)/.test(line)
}

export function markdownToHtml (markdown: string) {
  const lines = markdown.split('\n')
  const html: string[] = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index] as string

    if (!line.trim()) {
      index++
      continue
    }

    if (/^```/.test(line)) {
      const codeLines: string[] = []
      index++
      while (index < lines.length && !/^```\s*$/.test(lines[index] as string)) {
        codeLines.push(lines[index] as string)
        index++
      }
      index += index < lines.length ? 1 : 0
      html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`)
      continue
    }

    if (/^(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      html.push('<hr>')
      index++
      continue
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/)
    if (heading) {
      const level = heading[1]?.length
      html.push(`<h${level}>${applyInlineMarkdown(heading[2] as string)}</h${level}>`)
      index++
      continue
    }

    if (/^>\s?/.test(line)) {
      const quoteLines: string[] = []
      while (index < lines.length && /^>\s?/.test(lines[index] as string)) {
        quoteLines.push((lines[index] as string).replace(/^>\s?/, ''))
        index++
      }
      html.push(`<blockquote><p>${applyInlineMarkdown(normalizeParagraph(quoteLines.join('\n')))}</p></blockquote>`)
      continue
    }

    if (/^[-+*]\s+/.test(line)) {
      const items: string[] = []
      while (index < lines.length && /^[-+*]\s+/.test(lines[index] as string)) {
        items.push(`<li>${applyInlineMarkdown((lines[index] as string).replace(/^[-+*]\s+/, ''))}</li>`)
        index++
      }
      html.push(`<ul>${items.join('')}</ul>`)
      continue
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (index < lines.length && /^\d+\.\s+/.test(lines[index] as string)) {
        items.push(`<li>${applyInlineMarkdown((lines[index] as string).replace(/^\d+\.\s+/, ''))}</li>`)
        index++
      }
      html.push(`<ol>${items.join('')}</ol>`)
      continue
    }

    const paragraphLines = [line]
    index++
    while (
      index < lines.length &&
      (lines[index] as string).trim() &&
      !isBlockStart(lines[index] as string)
    ) {
      paragraphLines.push(lines[index] as string)
      index++
    }
    html.push(`<p>${applyInlineMarkdown(normalizeParagraph(paragraphLines.join('\n')))}</p>`)
  }

  return html.join('\n')
}
