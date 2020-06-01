<template>
  <div class="fe-home">
    <v-img
      class="hero-image"
      src='@/assets/homebanner.jpg'
      max-height='350px'
    ></v-img>
    <div>Home</div>
    <v-btn @click="openCatalog">Catalog</v-btn>
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
