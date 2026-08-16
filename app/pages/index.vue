<template>
  <div class="home-page">
    <div class="container mx-auto home-hero">
      <h1
        class="text-white font-display text-center mt-8 text-5xl block"
        :class="mainTitleAnimationState"
      >
        ¡Hola friend!
      </h1>
      <p
        class="text-white font-body text-center text-xl"
        :class="isMainSubtitleP1AnimationState"
      >
        These days the writing comes first.
      </p>
      <p
        class="text-white font-body text-center mb-5 text-xl"
        :class="isMainSubtitleP2AnimationState"
      >
        Start with the latest essay, then wander where you like.
      </p>

      <section
        class="home-latest-article"
        :class="latestArticleAnimationState"
      >
        <p class="home-kicker">
          Latest article
        </p>
        <p class="home-latest-date">
          {{ latestArticleDate }}
        </p>
        <h2 class="home-latest-title">
          {{ latestArticle.title }}
        </h2>
        <p class="home-latest-excerpt">
          {{ latestArticle.excerpt }}
        </p>
        <NuxtLink
          class="home-latest-link"
          :to="`/blog/${latestArticle.slug}`"
        >
          Read “{{ latestArticle.title }}”
          <font-awesome-icon icon="arrow-right" />
        </NuxtLink>
      </section>

      <div
        class="home-secondary-links"
        :class="secondaryLinksAnimationState"
      >
        <NuxtLink to="/blog">
          All writing
        </NuxtLink>
        <NuxtLink to="/nerd">
          Nerd
        </NuxtLink>
        <NuxtLink to="/wanderer">
          Wanderer
        </NuxtLink>
        <NuxtLink to="/creative">
          Creative
        </NuxtLink>
      </div>

      <UtilitiesSocialLinks :animation-timeout="animationInterval * 7" />
    </div>


    <UtilitiesFeaturedQuote
      :quote="latestArticle.featuredQuote.quote"
      :author="latestArticle.featuredQuote.author"
      color="white"
      :author-appear-delay="8000"
      :disable-scroll-down="true"
      class="bg-indigo-900"
      pattern="topography"
      :pattern-opacity="0.08"
    />
  </div>
</template>

<script>
import { SVG } from '@svgdotjs/svg.js'
import { blogArticles, formatBlogDate } from '~/data/blog'

export default {
  name: 'HomeNavigator',
  data () {
    return {
      articles: blogArticles,
      isMainTitleAnimated: false,
      isMainSubtitleAnimatedP1: false,
      isMainSubtitleAnimatedP2: false,
      isLatestArticleAnimated: false,
      isSecondaryLinksAnimated: false,
      animationInterval: 1000
    }
  },
  computed: {
    latestArticle () {
      return this.articles[0]
    },
    latestArticleDate () {
      return formatBlogDate(this.latestArticle.publishedAt)
    },
    mainTitleAnimationState () {
      return this.getAnimationKeys('isMainTitleAnimated')
    },
    isMainSubtitleP1AnimationState () {
      return this.getAnimationKeys('isMainSubtitleAnimatedP1')
    },
    isMainSubtitleP2AnimationState () {
      return this.getAnimationKeys('isMainSubtitleAnimatedP2')
    },
    latestArticleAnimationState () {
      return this.getAnimationKeys('isLatestArticleAnimated')
    },
    secondaryLinksAnimationState () {
      return this.getAnimationKeys('isSecondaryLinksAnimated')
    }
  },
  mounted () {
    this.beginAnimating()
    setTimeout(() => {
      this.isMainTitleAnimated = true
    }, this.animationInterval)
    setTimeout(() => {
      this.isMainSubtitleAnimatedP1 = true
    }, this.animationInterval * 2)
    setTimeout(() => {
      this.isMainSubtitleAnimatedP2 = true
    }, this.animationInterval * 3)
    setTimeout(() => {
      this.isLatestArticleAnimated = true
    }, this.animationInterval * 4)
    setTimeout(() => {
      this.isSecondaryLinksAnimated = true
    }, this.animationInterval * 5)
  },
  beforeUnmount () {
    const playground = document.getElementById('playground')
    if (playground) {
      playground.innerHTML = ''
    }
  },
  methods: {
    getAnimationKeys (key) {
      return {
        'transition-all duration-500 ease-in-out transform': true,
        'opacity-100 translate-y-0': this[key],
        'opacity-0 translate-y-2': !this[key]
      }
    },
    beginAnimating () {
      const playground = document.getElementById('playground')
      if (!playground) {
        return
      }
      const draw = SVG().addTo(playground).size('100%', '100%')
      const smallerSize = window.innerWidth < window.innerHeight
        ? window.innerWidth
        : window.innerHeight
      let i = 0
      while (i < 13) {
        const x = Math.random() * window.innerWidth
        const y = Math.random() * window.innerHeight
        const circleSize = smallerSize * Math.random()
        const circle = draw.circle(1).move(x, y)
        circle.fill('rgba(1,1,1,0.04)')
        circle.animate({ delay: i * 300 }).size(circleSize, circleSize)
        i++
      }
    }
  }
}
</script>

<style>
#playground {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -100;
}

.home-page {
  color: #f8f1e5;
}

.home-hero {
  min-height: 100vh;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.home-latest-article {
  width: min(100%, 48rem);
  margin: 2rem auto 0;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 1.5rem;
  background: rgba(17, 11, 34, 0.34);
  backdrop-filter: blur(12px);
  box-shadow: 0 22px 60px rgba(7, 4, 19, 0.24);
}

.home-kicker {
  font-family: "Trend W01 Sns One", "sans-serif";
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(248, 241, 229, 0.68);
}

.home-kicker-dark {
  color: rgba(38, 27, 23, 0.56);
}

.home-latest-date {
  margin-top: 1rem;
  font-family: "Sofia W01 Bold1446843", "sans-serif";
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(248, 241, 229, 0.72);
}

.home-latest-title,
.home-feed-title {
  font-family: "Trend W01 Sns One", "sans-serif";
}

.home-latest-title {
  margin-top: 0.75rem;
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 0.98;
}

.home-latest-excerpt {
  margin-top: 1rem;
  font-family: "Sofia W01 Regular1446825", "sans-serif";
  font-size: 1.15rem;
  line-height: 1.8;
  color: rgba(248, 241, 229, 0.82);
}

.home-latest-link,
.home-secondary-links a {
  transition: color 180ms ease;
}

.home-latest-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
  font-family: "Trend W01 Sns One", "sans-serif";
  color: #fff8ea;
}

.home-latest-link:hover,
.home-secondary-links a:hover {
  color: #f8c68d;
}

.home-secondary-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem 1.5rem;
  margin-top: 1.5rem;
  font-family: "Trend W01 Sns One", "sans-serif";
  color: rgba(248, 241, 229, 0.9);
}

.home-article-feed {
  background: rgba(255, 248, 236, 0.96);
  color: #261b17;
  padding: 4rem 1.5rem 5rem;
}

.home-feed-header {
  margin-bottom: 2rem;
}

.home-feed-title {
  font-size: clamp(2rem, 4vw, 3rem);
  color: #261b17;
}

@media screen and (max-width: 767px) {
  .home-latest-article {
    padding: 1.25rem;
  }
}
</style>
