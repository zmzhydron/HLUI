// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import routerList from './router'
// import store from './store';
import iView from 'iview';
import 'iview/dist/styles/iview.css'
// import Plugins from '@src/index.js'
import '../dist/index.js'
console.log(hlui, '$$$$$$$$');
const routerInstance = new Router({routes: routerList})
Vue.use(Router);
// Vue.config.productionTip = false;

/* eslint-disable no-new */
Vue.use(iView);
Vue.use(hlui.default);
// router.beforeEach((to, from, next) => {
//   let userName = sessionStorage.getItem('userName');
//   if (to.path === '/' || userName) {
//     next();
//   } else if (to.path !== '/' && !userName) {
//     alert('没有登录，请重新登录');
//     next('/');
//   }
// });
// Vue.component('Shit', Shit);
new Vue({
  el: '#app',
  router: routerInstance,
  // store,
  template: '<App/>',
  components: { App }
});