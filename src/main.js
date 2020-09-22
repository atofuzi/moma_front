import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import '../node_modules/bootstrap/scss/bootstrap.scss'
import './assets/scss/main.scss'
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$axios = axios;

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
