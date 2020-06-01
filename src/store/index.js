import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    catalog: [],
  },
  mutations: {
    updateCatalog(state, data) {
      this.state.catalog = data;
    },
  },
  getters: {
    getCatalog: (state) => state.catalog,
  },
  actions: {
  },
  modules: {
  },
});
