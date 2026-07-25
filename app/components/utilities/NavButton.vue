<template>
  <div
    :class="animationClass"
    :style="{ backgroundColor: backgroundColor }"
    class="nav-button-container text-white py-2 px-4 rounded shadow-md ml-5 mr-5 mt-2 mb-1 border-solid border cursor-pointer transition duration-500 ease-in-out transform transition-all"
    @click="navigate()"
  >
    <span class="text-5xl mr-4 active-mobile-emoji md:hidden">{{ emoji }}</span>
    <span class="text-5xl mr-4 hover-mobile-emoji hidden">{{ hoverEmoji }}</span>
    <p class="w-full text-white md:text-center md:pb-4">
      <span class="text-5xl mr-4 active-desktop-emoji">{{ emoji }}</span>
      <span class="text-5xl mr-4 hover-desktop-emoji hidden">{{ hoverEmoji }}</span>
      <strong class="font-display text-xl mb-1 block">A {{ title }}</strong>
      <span class="font-body text-lg">{{ description }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'NavButton',
  props: {
    title: String,
    emoji: String,
    hoverEmoji: String,
    description: String,
    backgroundColor: String,
    animationTimeout: Number,
    route: String
  },
  data () {
    return {
      animateIntoScreen: false,
      isMobile: false
    }
  },
  computed: {
    animationClass () {
      return {
        'opacity-100': this.animateIntoScreen,
        'opacity-0 translate-y-2': !this.animateIntoScreen,
        'hover:translate-x-2': this.isMobile,
        'hover:-translate-y-2': !this.isMobile
      }
    }
  },
  mounted () {
    this.isMobile = window.innerWidth < 768
    setTimeout(() => {
      this.animateIntoScreen = true
    }, this.animationTimeout)
  },
  methods: {
    navigate () {
      this.$router.push(this.route)
    }
  }
}
</script>

<style scoped>
.nav-button-container {
  border-color: rgba(255, 255, 255, 0.50);
}

.nav-button-container:hover {
  background: rgba(106, 55, 255, 0.6);
  border-color: rgba(243, 243, 243, 0.95);
}

@media screen and (min-width: 768px) {
  .nav-button-container:hover .active-desktop-emoji {
    display: none;
  }

  .nav-button-container:hover .hover-desktop-emoji {
    display: block;
  }
}

@media screen and (max-width: 767px) {
  .nav-button-container .active-desktop-emoji {
    display: none;
  }

  .nav-button-container:hover .active-mobile-emoji {
    display: none;
  }

  .nav-button-container:hover .hover-mobile-emoji {
    display: block;
  }
}
</style>
