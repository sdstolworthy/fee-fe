import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    catalog: [],
    user: {},
    jwt: '',
  },
  plugins: [createPersistedState()],
  mutations: {
    updateCatalog(state, data) {
      this.state.catalog = data;
    },
    setUser(state, user) {
      console.log(user);
      this.state.user = user.user;
      this.state.jwt = user.jwt;
    },
    logout() {
      this.state.user = null;
      this.state.jwt = '';
    },
  },
  getters: {
    getCatalog: (state) => state.catalog,
    username: (state) => state.user && state.user.username,
    userAvatar: (state) => state.user && state.user.Avatar,
  },
  actions: {
  },
  modules: {
  },
});
