import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '../static/css/theme-green/index.css'
import VueWave from 'vue-waves/dist/vue-waves'
import './style/style.css'

Vue.config.productionTip = false
Vue.use(VueWave)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
