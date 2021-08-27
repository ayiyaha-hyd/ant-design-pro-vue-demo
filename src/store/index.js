import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
/**
 * 引入Vuex，进行组件之间的状态、依赖、共享管理
 * Vuex的核心是Store(仓库),"store"就是一个容器,它包含着你的应用中大部分的状态 (state)。
 */
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
});
