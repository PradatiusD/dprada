<template>
  <nav
    class="social-links"
    :class="animationClass"
    aria-label="Social media"
  >
    <a
      v-for="link in links"
      :key="link.label"
      :href="link.href"
      class="social-link"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="link.label"
      :title="link.label"
    >
      <font-awesome-icon :icon="['fab', link.icon]" />
      <span class="sr-only">{{ link.label }}</span>
    </a>
  </nav>
</template>

<script>
export default {
  name: 'SocialLinks',
  props: {
    animationTimeout: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      visible: false,
      links: [
        {
          label: 'X (Twitter)',
          href: 'https://x.com/PradatiusD',
          icon: 'x-twitter'
        },
        {
          label: 'Instagram',
          href: 'https://www.instagram.com/pradatiusd/',
          icon: 'instagram'
        },
        {
          label: 'LinkedIn',
          href: 'https://www.linkedin.com/in/danielprada/',
          icon: 'linkedin-in'
        }
      ]
    }
  },
  computed: {
    animationClass () {
      return {
        'opacity-100 translate-y-0': this.visible,
        'opacity-0 translate-y-2': !this.visible
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.visible = true
    }, this.animationTimeout)
  }
}
</script>

<style scoped>
.social-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  transition: all 0.5s ease-in-out;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 9999px;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.08);
  font-size: 1.15rem;
  transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;
}

.social-link:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.9);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
