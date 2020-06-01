<template>
  <v-app-bar
    app
    clipped-left
    elevate-on-scroll
    color="#ffffff"
    flat
  >
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2 show-link"
        contain
        src="@/assets/logo.png"
        transition="scale-transition"
        @click="goHome()"
      />
    </div>

    <v-spacer></v-spacer>

    <v-btn
      href="https://github.com/vuetifyjs/vuetify/releases/latest"
      target="_blank"
      text
    >
      <span class="mr-2">Latest Release</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'O-Header',
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
