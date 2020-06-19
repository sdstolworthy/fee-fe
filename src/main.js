import Vue from 'vue';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.use(VueApollo);

const apolloClient = new ApolloClient({
  uri: process.env.VUE_APP_CMSURL,
  cache: new InMemoryCache(),
  request: (operation) => {
    const token = localStorage.getItem('jwt');
    operation.setContext({
      headers: token ? {
        authorization: `Bearer ${token}`,
      } : {},
    });
  },
  onError: ({ networkError, graphQLErrors }) => {
    if (graphQLErrors) {
      console.warn('graphQLErrors', graphQLErrors);
    }
    if (networkError) {
      console.warn('networkError', networkError);
    }
  },
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
