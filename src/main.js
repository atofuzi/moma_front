import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import '../node_modules/bootstrap/scss/bootstrap.scss'
import './assets/scss/main.scss'
import axios from 'axios'

/* // ほとんどのエラーをキャッチ
Vue.config.errorHandler = function (err, vm, info) {
  // 2.2.0 以降で使用できます。
  alert(err, vm, info);
}
// 残りのエラーをキャッチ
window.addEventListener("error", event => {
  alert(event.error);
});
window.addEventListener("unhandledrejection", event => {
  alert(event.reason);
});
 */
Vue.config.productionTip = false

Vue.prototype.$axios = axios;

Vue.filter('numberFormat', function (value) {
  if (!value) { return null }
  return value.toString().replace(/([0-9]+?)(?=(?:[0-9]{3})+$)/g, '$1,');
});

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')



