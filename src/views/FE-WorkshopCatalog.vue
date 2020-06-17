<template>
  <div>
    <div class='hero-image'>
      <v-img
        src='@/assets/kandinsky.jpg'
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
      <fe-workshop-filter
        v-show='dataLoaded'
        :items='tags'
        @update="onFilterSelection"
      ></fe-workshop-filter>
      <fe-workshop-pane v-if="dataLoaded" :workshopItems='filteredList'></fe-workshop-pane>
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
    onFilterSelection(newData) {
      this.tagFilter = newData;
    },
  },
  data() {
    return {
      dataLoaded: false,
      tagFilter: [],
    };
  },
  computed: {
    filteredList() {
      if (this.tagFilter.length === 0) {
        return this.practices;
      }
      return this.practices.filter((post) => {
        const found = post.tags.some((v) => this.tagFilter.indexOf(v.tag) !== -1);
        return found;
      });
    },
    tags() {
      let filtered = [];
      if (this.practices) {
        const result = this.practices.map(({ tags }) => tags.map(({ tag }) => tag));
        const flattenedArray = [].concat(...result);
        // eslint-disable-next-line max-len
        filtered = flattenedArray.reduce((unique, item) => (unique.includes(item) ? unique : [...unique, item]), []);
      }
      return filtered;
    },
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
  padding-top: 1.25rem;
  width: calc(80vw + 1.875rem);
  max-width: 89.375rem;
  margin: auto;
  display:flex;
  flex-direction:column;
}
</style>
