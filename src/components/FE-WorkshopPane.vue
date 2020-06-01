<template>
  <div class="fe-workshop-container">
    <fe-workshopFilter></fe-workshopFilter>
    <div class="fe-workshop-container fe-workshop-container-menu">
      <fe-workshop-item
        v-for="item in workshopItems"
        :key="item.id"
        class="fe-workshop-item"
        :carddata='item'></fe-workshop-item>
    </div>
  </div>
</template>

<script>
import FeWorkshopFilter from '@/components/FE-WorkshopFilter.vue';
import FeWorkshopItem from '@/components/FE-WorkshopItem.vue';

export default {
  name: 'FE-WorkshopPane',
  components: {
    FeWorkshopFilter,
    FeWorkshopItem,
  },
  props: {
    workshopItems: Array,
  },
};
</script>

<style lang="scss" scoped>
.fe-workshop-container{
  padding-top: 20px;
  width: 80vw;
  max-width: 1000px;
  margin: auto;
}

.fe-workshop-container-menu{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.fe-workshop-item {
  flex: 0 1 calc(33% - 1em);
  min-width: 290px;
}
</style>
