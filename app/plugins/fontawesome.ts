import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faArrowRight,
  faFan,
  faSnowflake,
  faGrinHearts,
  faCog,
  faAtom,
  faArrowDown
} from '@fortawesome/free-solid-svg-icons'
import {
  faXTwitter,
  faInstagram,
  faLinkedinIn
} from '@fortawesome/free-brands-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'

// CSS is imported above; prevent Font Awesome from injecting its own.
config.autoAddCss = false

library.add(
  faArrowRight,
  faFan,
  faSnowflake,
  faGrinHearts,
  faCog,
  faAtom,
  faArrowDown,
  faXTwitter,
  faInstagram,
  faLinkedinIn
)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
  // Keep the original kebab-case tag used throughout the site.
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
