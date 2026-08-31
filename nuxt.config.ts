import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'

function getBlogArticleRoutes () {
  const blogDirectory = resolve(process.cwd(), 'app/content/blog')

  return readdirSync(blogDirectory)
    .filter(file => file.endsWith('.md'))
    .map(file => `/blog/${file.replace(/\.md$/, '')}`)
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  // Pre-render every route to plain HTML for S3 / CloudFront static hosting.
  // `npm run generate` (also wired as `build`) writes the site to `.output/public`.
  ssr: true,

  modules: ['@nuxtjs/tailwindcss'],

  // Single CSS entry: custom fonts + Tailwind + site styles
  tailwindcss: {
    cssPath: '~/assets/styles/index.css',
    configPath: 'tailwind.config.js'
  },
  devServer: {
    port: 3001
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Daniel Prada: Nerd, Wanderer, & Creative',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Discover who I am in more ways than one.'
        },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:type', content: 'website' },
        {
          property: 'og:title',
          content: 'Daniel Prada: A Nerd, Wanderer, & Creative'
        },
        {
          property: 'og:description',
          content: 'Discover who I am in more ways than one.'
        },
        { property: 'og:url', content: 'https://www.danielprada.co' },
        {
          property: 'og:site_name',
          content: 'Daniel Prada: Nerd, Wanderer, & Creative'
        },
        { property: 'og:image', content: '/images/og-image.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:description',
          content:
            'Take a break from Twitter and discover who I am in more ways than one.'
        },
        {
          name: 'twitter:title',
          content: 'Daniel Prada: A Nerd, Wanderer, & Creative'
        },
        { name: 'twitter:site', content: '@PradatiusD' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://www.danielprada.co/' }
      ],
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'http://schema.org/',
            '@type': 'Person',
            name: 'Daniel Prada',
            description:
              'Daniel Prada is a self taught software engineer, with 5+ years of programming experience. His primary role is at Spanish Broadcasting System, where he leads the product development of LaMusica, a digital music entertainment platform that brings in 400K monthly users.  He is co-founder of Targetbridge, a digital consulting and implementation firm.  He holds a degree in Commerce, Organizations, & Entrepreneurship from Brown University.  In addition, Daniel organizes & plays Ultimate Frisbee in South Florida, writes stories, and consults for Slay, a beauty tech startup aimed to be the OpenTable for salons.'
          })
        }
      ]
    }
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/nerd', '/wanderer', '/creative', '/blog', ...getBlogArticleRoutes()]
    }
  },

  typescript: {
    typeCheck: false
  }
})
