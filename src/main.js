// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './assets/style/main.scss'
import Vuex from 'vuex'
import store from './store/index.js'
import fontAwesome from 'font-awesome/css/font-awesome.min.css'

Vue.use(Vuetify)
Vue.use(Vuex)
Vue.use(fontAwesome)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
