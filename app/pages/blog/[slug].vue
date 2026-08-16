<template>
  <main v-if="article">
    <UtilitiesFeaturedQuote
      :quote="article.featuredQuote.quote"
      :author="article.featuredQuote.author"
      color="white"
      :author-appear-delay="5000"
      class="blog-featured-quote"
      :disable-scroll-down="true"
      pattern="topography"
      :pattern-opacity="0.08"
    />

    <section class="blog-article-page">
      <div class="blog-breadcrumbs">
        <NuxtLink to="/blog">
          Blog
        </NuxtLink>
        <span>/</span>
        <span>{{ article.title }}</span>
      </div>

      <BlogArticleContent :article="article" />
    </section>
  </main>
</template>

<script>
import { getBlogArticleBySlug } from '~/data/blog'

export default {
  name: 'BlogArticlePage',
  validate (route) {
    return Boolean(getBlogArticleBySlug(route.params.slug))
  },
  computed: {
    article () {
      return getBlogArticleBySlug(this.$route.params.slug)
    }
  },
  head () {
    if (!this.article) {
      return {
        title: 'Article Not Found | Daniel Prada'
      }
    }
    return {
      title: `${this.article.title} | Daniel Prada`,
      meta: [
        {
          name: 'description',
          content: this.article.excerpt
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: `https://www.danielprada.co/blog/${this.article.slug}`
        }
      ]
    }
  }
}
</script>
