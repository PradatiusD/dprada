<template>
  <div class="blog-menu" @keydown.esc="closeMenu">
    <button
      class="blog-menu-toggle"
      type="button"
      aria-label="Open blog navigation"
      :aria-expanded="isOpen ? 'true' : 'false'"
      aria-controls="blog-menu-panel"
      @click="toggleMenu"
    >
      <span class="blog-menu-letter" aria-hidden="true">d</span>
      <span class="blog-menu-lines" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
    </button>

    <Transition name="blog-menu-fade">
      <button
        v-if="isOpen"
        class="blog-menu-backdrop"
        type="button"
        aria-label="Close blog navigation"
        @click="closeMenu"
      />
    </Transition>

    <Transition name="blog-menu-slide">
      <nav
        v-if="isOpen"
        id="blog-menu-panel"
        class="blog-menu-panel"
        aria-label="Blog posts"
      >
        <div class="blog-menu-header">
          <div>
            <p class="blog-menu-kicker">
              Daniel Prada
            </p>
            <h2>Writing</h2>
          </div>
          <button
            ref="closeButton"
            class="blog-menu-close"
            type="button"
            aria-label="Close blog navigation"
            @click="closeMenu"
          >
            ×
          </button>
        </div>

        <NuxtLink class="blog-menu-all" to="/blog" @click="closeMenu">
          All blog posts
          <span aria-hidden="true">→</span>
        </NuxtLink>

        <ol class="blog-menu-posts">
          <li v-for="article in articles" :key="article.slug">
            <NuxtLink :to="`/blog/${article.slug}`" @click="closeMenu">
              <time :datetime="article.publishedAt">
                {{ formatBlogDate(article.publishedAt) }}
              </time>
              <span>{{ article.title }}</span>
            </NuxtLink>
          </li>
        </ol>
      </nav>
    </Transition>
  </div>
</template>

<script>
import { blogArticles, formatBlogDate } from '~/data/blog'

export default {
  name: 'BlogNavigationMenu',
  data () {
    return {
      articles: blogArticles,
      isOpen: false
    }
  },
  watch: {
    '$route.fullPath' () {
      this.closeMenu()
    },
    isOpen (isOpen) {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = isOpen ? 'hidden' : ''
      }
      if (isOpen) {
        this.$nextTick(() => this.$refs.closeButton?.focus())
      }
    }
  },
  beforeUnmount () {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }
  },
  methods: {
    formatBlogDate,
    toggleMenu () {
      this.isOpen = !this.isOpen
    },
    closeMenu () {
      this.isOpen = false
    }
  }
}
</script>

<style scoped>
.blog-menu-toggle {
  position: fixed;
  z-index: 80;
  top: 1rem;
  right: 1rem;
  display: grid;
  place-items: center;
  width: 3.6rem;
  height: 3.6rem;
  border: 1px solid rgba(255, 248, 234, 0.34);
  border-radius: 50%;
  color: #fff8ea;
  background: rgba(20, 12, 40, 0.76);
  box-shadow: 0 12px 32px rgba(7, 4, 19, 0.28);
  backdrop-filter: blur(14px);
  transition: transform 180ms ease, background 180ms ease;
}

.blog-menu-toggle:hover {
  transform: translateY(-2px);
  background: rgba(75, 32, 112, 0.94);
}

.blog-menu-toggle:focus-visible,
.blog-menu-close:focus-visible,
.blog-menu-panel a:focus-visible {
  outline: 3px solid #f8c68d;
  outline-offset: 3px;
}

.blog-menu-letter {
  position: relative;
  left: -0.08rem;
  font-family: "Trend W01 Sns One", "sans-serif";
  font-size: 2.15rem;
  line-height: 1;
}

.blog-menu-lines {
  position: absolute;
  right: 0.55rem;
  bottom: 0.78rem;
  display: grid;
  gap: 0.17rem;
  width: 0.9rem;
}

.blog-menu-lines span {
  display: block;
  height: 0.12rem;
  border-radius: 999px;
  background: #f8c68d;
}

.blog-menu-backdrop {
  position: fixed;
  z-index: 60;
  inset: 0;
  width: 100%;
  border: 0;
  background: rgba(8, 5, 17, 0.62);
  backdrop-filter: blur(3px);
}

.blog-menu-panel {
  position: fixed;
  z-index: 70;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(90vw, 27rem);
  overflow-y: auto;
  padding: 5.5rem 1.5rem 2rem;
  color: #261b17;
  background:
    radial-gradient(circle at top right, rgba(248, 198, 141, 0.34), transparent 30%),
    #fff8ec;
  box-shadow: -24px 0 70px rgba(7, 4, 19, 0.34);
}

.blog-menu-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(38, 27, 23, 0.14);
}

.blog-menu-kicker,
.blog-menu-header h2,
.blog-menu-all,
.blog-menu-posts a span {
  font-family: "Trend W01 Sns One", "sans-serif";
}

.blog-menu-kicker {
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(38, 27, 23, 0.5);
}

.blog-menu-header h2 {
  margin-top: 0.35rem;
  font-size: 2.1rem;
  line-height: 1;
}

.blog-menu-close {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  color: #261b17;
  background: rgba(38, 27, 23, 0.08);
  font-size: 1.65rem;
  line-height: 1;
}

.blog-menu-all {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.85rem;
  color: #fff8ec;
  background: #4b2070;
}

.blog-menu-posts {
  display: grid;
  gap: 0;
  margin-top: 0.75rem;
}

.blog-menu-posts li {
  border-bottom: 1px solid rgba(38, 27, 23, 0.1);
}

.blog-menu-posts a {
  display: grid;
  gap: 0.4rem;
  padding: 1rem 0.25rem;
  transition: color 160ms ease, transform 160ms ease;
}

.blog-menu-posts a:hover {
  color: #7b3aed;
  transform: translateX(0.25rem);
}

.blog-menu-posts time {
  font-family: "Sofia W01 Bold1446843", "sans-serif";
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(38, 27, 23, 0.52);
}

.blog-menu-posts a span {
  font-size: 1.08rem;
  line-height: 1.2;
}

.blog-menu-fade-enter-active,
.blog-menu-fade-leave-active,
.blog-menu-slide-enter-active,
.blog-menu-slide-leave-active {
  transition: opacity 220ms ease, transform 220ms ease;
}

.blog-menu-fade-enter-from,
.blog-menu-fade-leave-to {
  opacity: 0;
}

.blog-menu-slide-enter-from,
.blog-menu-slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

@media (prefers-reduced-motion: reduce) {
  .blog-menu-toggle,
  .blog-menu-posts a,
  .blog-menu-fade-enter-active,
  .blog-menu-fade-leave-active,
  .blog-menu-slide-enter-active,
  .blog-menu-slide-leave-active {
    transition: none;
  }
}
</style>
