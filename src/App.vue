<template>
  <v-app>
    <fe-header></fe-header>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import FeHeader from '@/components/FE-Header.vue';

export default {
  name: 'App',
  components: {
    FeHeader,
  },
};
</script>

<style lang="scss">
@import "@/styles/main.scss";
</style>
