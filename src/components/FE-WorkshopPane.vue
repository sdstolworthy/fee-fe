<template>
  <div class="fe-workshop-container fe-workshop-menu">
    <fe-workshop-item
      v-for="item in workshopItems"
      :key="item.id"
      class="fe-workshop-item"
      :carddata='item'></fe-workshop-item>
  </div>
</template>

<script>
import FeWorkshopItem from '@/components/FE-WorkshopItem.vue';

export default {
  name: 'FE-WorkshopPane',
  components: {
    FeWorkshopItem,
  },
  props: {
    workshopItems: Array,
  },
};
</script>

<style lang="scss" scoped>
.fe-workshop-menu{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex:1;
  overflow: scroll;
}

.fe-workshop-item {
  flex: 0 1 calc(33% - 1em);
  min-width: 290px;
}
</style>
