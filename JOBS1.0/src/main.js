import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible/index.js'
import Plugin from './plugin'
import Vant from 'vant';
import 'vant/lib/index.css';
import { Toast } from 'vant';

Vue.use(Plugin);
Vue.use(Vant);
Vue.use(Toast);

import axios from 'axios';
axios.interceptors.request.use(function (config) {
  // 每次发起axios的时候，就会把token带给后端
  config.headers.token = localStorage.getItem('token');
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
Vue.prototype.$axios = axios;




Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
