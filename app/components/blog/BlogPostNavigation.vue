<template>
  <nav class="blog-post-navigation" aria-label="Navigate between blog posts">
    <NuxtLink
      v-if="newerArticle"
      class="blog-post-navigation-link blog-post-navigation-newer"
      :to="`/blog/${newerArticle.slug}`"
      rel="prev"
    >
      <span class="blog-post-navigation-direction">← Newer post</span>
      <strong>{{ newerArticle.title }}</strong>
      <time :datetime="newerArticle.publishedAt">{{ formatBlogDate(newerArticle.publishedAt) }}</time>
    </NuxtLink>
    <span v-else class="blog-post-navigation-boundary">
      <span>← Newer post</span>
      <strong>You’re reading the latest post</strong>
    </span>

    <NuxtLink
      v-if="olderArticle"
      class="blog-post-navigation-link blog-post-navigation-older"
      :to="`/blog/${olderArticle.slug}`"
      rel="next"
    >
      <span class="blog-post-navigation-direction">Older post →</span>
      <strong>{{ olderArticle.title }}</strong>
      <time :datetime="olderArticle.publishedAt">{{ formatBlogDate(olderArticle.publishedAt) }}</time>
    </NuxtLink>
    <span v-else class="blog-post-navigation-boundary blog-post-navigation-older">
      <span>Older post →</span>
      <strong>You’ve reached the first post</strong>
    </span>
  </nav>
</template>

<script>
import { blogArticles, formatBlogDate } from '~/data/blog'

export default {
  name: 'BlogPostNavigation',
  props: {
    currentSlug: {
      type: String,
      required: true
    }
  },
  computed: {
    currentIndex () {
      return blogArticles.findIndex(article => article.slug === this.currentSlug)
    },
    newerArticle () {
      return this.currentIndex > 0 ? blogArticles[this.currentIndex - 1] : null
    },
    olderArticle () {
      return this.currentIndex >= 0 && this.currentIndex < blogArticles.length - 1
        ? blogArticles[this.currentIndex + 1]
        : null
    }
  },
  methods: {
    formatBlogDate
  }
}
</script>

<style scoped>
.blog-post-navigation {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  width: min(100%, 70rem);
  margin: clamp(2rem, 6vw, 4rem) auto 0;
  padding-top: clamp(1.25rem, 3vw, 2rem);
  border-top: 1px solid rgba(38, 27, 23, 0.16);
}

.blog-post-navigation-link,
.blog-post-navigation-boundary {
  display: grid;
  gap: 0.5rem;
  min-height: 8.5rem;
  padding: clamp(1rem, 2.5vw, 1.4rem);
  border: 1px solid rgba(38, 27, 23, 0.12);
  border-radius: 1rem;
}

.blog-post-navigation-link {
  color: #261b17;
  background:
    radial-gradient(circle at top left, rgba(123, 58, 237, 0.12), transparent 50%),
    rgba(255, 250, 241, 0.86);
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.blog-post-navigation-link:hover {
  transform: translateY(-3px);
  border-color: rgba(123, 58, 237, 0.36);
  box-shadow: 0 16px 35px rgba(38, 27, 23, 0.1);
}

.blog-post-navigation-link:focus-visible {
  outline: 3px solid #7b3aed;
  outline-offset: 3px;
}

.blog-post-navigation-direction,
.blog-post-navigation-boundary > span,
.blog-post-navigation-link strong,
.blog-post-navigation-boundary strong {
  font-family: "Trend W01 Sns One", "sans-serif";
}

.blog-post-navigation-direction,
.blog-post-navigation-boundary > span {
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #7b3aed;
}

.blog-post-navigation-link strong,
.blog-post-navigation-boundary strong {
  align-self: center;
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  line-height: 1.15;
}

.blog-post-navigation-link time {
  align-self: end;
  font-family: "Sofia W01 Regular1446825", "sans-serif";
  font-size: 0.78rem;
  color: rgba(38, 27, 23, 0.54);
}

.blog-post-navigation-older {
  text-align: right;
}

.blog-post-navigation-boundary {
  color: rgba(38, 27, 23, 0.46);
  background: rgba(38, 27, 23, 0.035);
}

.blog-post-navigation-boundary > span {
  color: rgba(38, 27, 23, 0.38);
}

@media screen and (max-width: 620px) {
  .blog-post-navigation {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .blog-post-navigation-link {
    transition: none;
  }
}
</style>
