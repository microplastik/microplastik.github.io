// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuescroll from 'vue-scroll'
import BootstrapVue from 'bootstrap-vue'
import {ClientTable} from 'vue-tables-2';

require("../static/jquery.mousewheel.min.js")
Vue.config.productionTip = false;

Vue.use(BootstrapVue)
Vue.use(ClientTable);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
