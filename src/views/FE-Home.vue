<template>
  <div class="fe-home">
    <v-img
      class="hero-image"
      src='@/assets/homebanner.jpg'
      max-height='350px'
    ></v-img>
    <div class='fe-home-content'>
      <h1 class="">What is the frontend enablement?</h1>
      <p>The frontend enablement is a curated series of essays and workshops on the art
        and science of frontend development. We follow the career path of an aspiring
        developer to illustrate the core and advanced competencies of the trade. You can
        think of each workshop as a knowledge booster pack on a specific competency - the
        bare bones introduction to the tech with working examples and currated references
        for continued growth.
      </p>
      <v-btn @click="openCatalog">Catalog: Option 1</v-btn>
    </div>
  </div>
</template>

<script>

export default {
  name: 'FE-Home',
  methods: {
    openCatalog() {
      this.$router.push({ name: 'catalog' });
    },
  },
};
</script>

<style lang="scss" scoped>
.fe-home-content{
  padding-top: 1.875rem;
  width: 80vw;
  max-width: 87.5rem;
  margin: auto;
}

.v-btn {
  // margin-right: 50vw;
  // margin-left: 50vw;
  margin-top: 25px;
}
</style>
