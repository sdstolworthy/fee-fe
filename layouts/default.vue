<template>
  <v-app light>
    <v-app-bar
      app
      fixed
      clipped-left
      elevate-on-scroll
      elevation="1"
      color="rgba(255, 255, 255, 0.96)"
      flat
    >
      <nuxt-link to="/" no-prefetch>
        <v-img
          alt="FEE Logo"
          class="shrink mr-2 show-link fe-header-img"
          contain
          src="logo.png"
          transition="scale-transition"
        />
      </nuxt-link>
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <!-- <v-container> -->
      <nuxt />
      <!-- </v-container> -->
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Frontend Enablment',
    }
  },
  methods: {
    openCatalog() {
      this.$router.push({ name: 'index' })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/variables.scss';
</style>
