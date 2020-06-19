<template>
  <v-app-bar
    app
    clipped-left
    elevate-on-scroll
    color="#ffffff"
    flat
  >
      <v-img
        alt="FEE Logo"
        class="shrink mr-2 show-link fe-header-img"
        contain
        src="@/assets/logo.png"
        transition="scale-transition"
        @click="goHome()"
      />

    <v-spacer></v-spacer>

    <fe-auth></fe-auth>
  </v-app-bar>
</template>

<script>
import FeAuth from '@/components/FE-Auth.vue';

export default {
  name: 'FE-Header',
  components: {
    FeAuth,
  },
  methods: {
    goHome() {
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>

<style lang="scss" scoped>
.show-link{
  cursor: pointer;
}
</style>
