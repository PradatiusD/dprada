<template>
  <article class="blog-article-shell">
    <header class="blog-article-header">
      <p class="blog-article-date">
        {{ formattedDate }}
      </p>
      <h1 class="blog-article-title">
        {{ article.title }}
      </h1>
      <p class="blog-article-excerpt">
        {{ article.excerpt }}
      </p>
    </header>

    <div class="blog-article-flow">
      <template
        v-for="(block, index) in article.contentBlocks"
        :key="`${block.type}-${index}`"
      >
        <div
          v-if="block.type === 'markdown'"
          class="blog-article-body blog-markdown"
          v-html="block.html"
        />
        <BlogShortcodeRenderer
          v-else
          :shortcode="block.name"
        />
      </template>
    </div>
  </article>
</template>

<script>
import BlogShortcodeRenderer from '~/components/blog/BlogShortcodeRenderer.vue'
import { formatBlogDate } from '~/data/blog'

export default {
  name: 'BlogArticleContent',
  components: {
    BlogShortcodeRenderer
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedDate () {
      return formatBlogDate(this.article.publishedAt)
    }
  }
}
</script>
