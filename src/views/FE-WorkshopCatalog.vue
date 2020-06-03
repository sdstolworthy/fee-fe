<template>
  <div>
    <div class='hero-image'>
      <v-img
        src='@/assets/kandinsky.jpg'
        max-height='350px'
        class="hero-image"
      ></v-img>
    </div>
    <div class="fe-practices-loader">
      <v-progress-circular
      :size="70"
      :width="7"
      class="fe-practices-loader"
      v-show='!dataLoaded'
      indeterminate
      ></v-progress-circular>
    </div>
    <div class="fe-workshop-wrap">
      <fe-workshopFilter v-show='dataLoaded'></fe-workshopFilter>
      <fe-workshop-pane v-if="dataLoaded" :workshopItems='practices'></fe-workshop-pane>
    </div>
  </div>
</template>

<script>
import { GET_WORKSHOPS } from '@/assets/serviceApi/queries.js';
import FeWorkshopFilter from '@/components/FE-WorkshopFilter.vue';
import FeWorkshopPane from '@/components/FE-WorkshopPane.vue';

export default {
  name: 'FE-WorkshopCatalog',
  components: {
    FeWorkshopFilter,
    FeWorkshopPane,
  },
  methods: {
    openPost() {
      this.$router.push({ name: 'post', params: { slug: 'event-storming' } });
    },
  },
  data() {
    return {
      dataLoaded: false,
    };
  },
  watch: {
    practices() {
      this.dataLoaded = true;
    },
  },
  apollo: {
    practices: {
      query: GET_WORKSHOPS,
    },
  },
};
</script>

<style lang="scss" scoped>
.fe-workshop-wrap{
  padding-top: 20px;
  width: 80vw;
  max-width: 1000px;
  margin: auto;
  height: calc(100vh - 400px);
  display:flex;
  flex-direction:column;
}
</style>
