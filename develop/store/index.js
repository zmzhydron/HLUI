import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const zmzzmz = store => {
  store.subscribe((mutaion, state) => {
  });
};
export default new Vuex.Store({
  state: {
    ajaxErrorMessage: 'aaaaa',
    pageFocused: true // 页面是否在前台的标识，根据这个某些定时任务OR WS推送的信息就需要屏蔽;
  },
  actions: {
  },
  plugins: [zmzzmz],
  mutations: {
  },
  modules: {
  }
});