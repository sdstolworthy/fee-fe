<template>
  <div>
    <div class='hero-image'>
      <v-img
        src='@/assets/kandinsky.jpg'
        max-height='350px'
        class="hero-image"
      ></v-img>
    </div>
    <ApolloQuery :query="query">
      <template slot-scope="{ result: { loading, error, data } }">
        <span v-if="loading">
          <div class="fe-practices-loader">
            <v-progress-circular
            :size="70"
            :width="7"
            class="fe-practices-loader"
            color="blue"
            indeterminate
            ></v-progress-circular>
          </div>
        </span>
        <span v-else-if="error">An error occured</span>

        <fe-workshop-pane v-if="data" :workshopItems='data.practices'></fe-workshop-pane>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
// import apiService from '@/assets/serviceApi/serviceRoutes';
import { GET_WORKSHOPS } from '@/assets/serviceApi/queries.js';
import FeWorkshopPane from '@/components/FE-WorkshopPane.vue';

export default {
  name: 'FE-WorkshopCatalog',
  components: {
    FeWorkshopPane,
  },
  methods: {
    openPost() {
      this.$router.push({ name: 'post', params: { slug: 'event-storming' } });
    },
  },
  data() {
    return {
      query: GET_WORKSHOPS,
    };
  },
  // async mounted() {
  //   this.isLoading = true;
  //   apiService
  //     .getCatalog()
  //     .then((result) => {
  //       this.$store.commit('updateCatalog', result.data.data.practices);
  //       this.catalog = result.data.data.practices;
  //       this.isLoading = false;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //     .finally(() => {
  //       this.isLoading = false;
  //       console.log(this.$store.getters.getCatalog);
  //     });
  // },
};
</script>

<style lang="scss" scoped>

</style>
