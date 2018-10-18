import Vue from 'vue'
import axios from 'axios'
import { Drag, Drop } from 'vue-drag-drop'

import App from './App'
import router from './router'
import store from './store'

import {library as faLibrary} from '@fortawesome/fontawesome-svg-core'
import {faPlusCircle, faTimesCircle, faPen} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

faLibrary.add(faPlusCircle, faTimesCircle, faPen)
Vue.component('fa-icon', FontAwesomeIcon)

Vue.component('drag', Drag)
Vue.component('drop', Drop)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
