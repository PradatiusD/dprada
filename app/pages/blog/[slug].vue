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
      <BlogPostNavigation :current-slug="article.slug" />
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import BlogPostNavigation from '~/components/blog/BlogPostNavigation.vue'
import { getBlogArticleBySlug } from '~/data/blog'

const route = useRoute()
const article = computed(() => getBlogArticleBySlug(route.params.slug))

definePageMeta({
  validate (route) {
    return Boolean(getBlogArticleBySlug(route.params.slug))
  }
})

useSeoMeta({
  title: () => article.value ? `${article.value.title} | Daniel Prada` : 'Article Not Found | Daniel Prada',
  description: () => article.value?.excerpt || '',
  ogType: 'article',
  ogTitle: () => article.value?.title || 'Daniel Prada',
  ogDescription: () => article.value?.excerpt || '',
  ogUrl: () => article.value ? `https://www.danielprada.co/blog/${article.value.slug}` : 'https://www.danielprada.co/blog',
  ogImage: () => article.value ? `https://www.danielprada.co${article.value.ogImage}` : 'https://www.danielprada.co/images/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: () => article.value ? `${article.value.title} — an essay by Daniel Prada` : 'Daniel Prada',
  twitterCard: 'summary_large_image',
  twitterTitle: () => article.value?.title || 'Daniel Prada',
  twitterDescription: () => article.value?.excerpt || '',
  twitterImage: () => article.value ? `https://www.danielprada.co${article.value.ogImage}` : 'https://www.danielprada.co/images/og-image.png'
})

useHead(() => ({
  link: article.value
    ? [{
        rel: 'canonical',
        href: `https://www.danielprada.co/blog/${article.value.slug}`
      }]
    : []
}))
</script>
