<template>
  <div id="app">
    <div id="playground" aria-hidden="true" />
    <BlogNavigationMenu />
    <NuxtPage />
  </div>
</template>

<script>
import BlogNavigationMenu from '~/components/blog/BlogNavigationMenu.vue'

export default {
  name: 'App',
  components: {
    BlogNavigationMenu
  }
}
</script>
