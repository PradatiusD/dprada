import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import HomeNavigator from './components/pages/HomeNavigator'
import NerdPage from './components/pages/NerdPage'
import WandererPage from './components/pages/WandererPage'
import CreativePage from './components/pages/CreativePage'
import VueAnalytics from 'vue-analytics'

import './assets/styles/index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faArrowRight, faFan, faSnowflake, faGrinHearts, faCog, faAtom, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)
library.add(faArrowRight)

// Full Page Loader
library.add(faFan)
library.add(faSnowflake)
library.add(faGrinHearts)
library.add(faCog)
library.add(faAtom)
library.add(faArrowDown)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path: '/', component: HomeNavigator },
  { path: '/nerd', component: NerdPage },
  { path: '/wanderer', component: WandererPage },
  { path: '/creative', component: CreativePage }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.use(VueAnalytics, {
  id: 'UA-34638866-3',
  router
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
