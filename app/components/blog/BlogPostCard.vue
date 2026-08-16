<template>
  <article class="blog-card">
    <p class="blog-card-date">
      {{ formattedDate }}
    </p>
    <h2 class="blog-card-title">
      <NuxtLink :to="articlePath">
        {{ article.title }}
      </NuxtLink>
    </h2>
    <p class="blog-card-excerpt">
      {{ article.excerpt }}
    </p>
    <NuxtLink
      class="blog-card-link"
      :to="articlePath"
    >
      Read article
      <font-awesome-icon icon="arrow-right" />
    </NuxtLink>
  </article>
</template>

<script>
import { formatBlogDate } from '~/data/blog'

export default {
  name: 'BlogPostCard',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    articlePath () {
      return `/blog/${this.article.slug}`
    },
    formattedDate () {
      return formatBlogDate(this.article.publishedAt)
    }
  }
}
</script>
