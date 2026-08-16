<template>
  <main class="blog-page">
    <section class="blog-hero">
      <div class="blog-hero-inner">
        <p class="blog-kicker">
          Essays & Notes
        </p>
        <h1 class="blog-hero-title">
          The Blog
        </h1>
        <p class="blog-hero-copy">
          A home for reflections, essays, and unfinished thoughts worth returning to.
        </p>
      </div>
    </section>

    <section class="blog-listing">
      <div class="blog-listing-header">
        <p class="blog-kicker">
          Published
        </p>
        <h2 class="blog-listing-title">
          Current articles
        </h2>
      </div>

      <div class="blog-listing-grid">
        <BlogPostCard
          v-for="article in articles"
          :key="article.slug"
          :article="article"
        />
      </div>
    </section>
  </main>
</template>

<script>
import { blogArticles } from '~/data/blog'

export default {
  name: 'BlogIndexPage',
  data () {
    return {
      articles: blogArticles
    }
  },
  head () {
    return {
      title: 'Blog | Daniel Prada',
      meta: [
        {
          name: 'description',
          content: 'Reflections and essays by Daniel Prada.'
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://www.danielprada.co/blog'
        }
      ]
    }
  }
}
</script>
