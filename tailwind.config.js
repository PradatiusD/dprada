/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './app/error.vue'
  ],
  theme: {
    fontFamily: {
      display: ['Trend W01 Sns One', 'sans-serif'],
      body: ['Sofia W01 Regular1446825', 'sans-serif']
    },
    extend: {}
  },
  plugins: []
}
