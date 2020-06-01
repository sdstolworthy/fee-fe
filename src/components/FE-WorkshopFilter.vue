<template>
  <div class="fe-workshop-filter">
    <div class="fe-workshop-filter-large">
      <span
        class='fe-filter-item'
        v-for="(type, index) in practiceTypes"
        :key="`type-${index}`"
      >
        {{type}}
      </span>
    </div>
    <v-select
      :items="practiceTypes"
      label="Filter Practices"
      class="fe-workshop-filter-small"
    ></v-select>
  </div>
</template>

<script>
export default {
  name: 'FE-WorkshopFilter',
  data: () => ({
    practiceTypes: [
      'All',
      '100',
      '200',
      '300',
      '400',
      '500',
    ],
  }),
};
</script>

<style lang="scss" scoped>
.fe-workshop-filter-large{
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
}

.fe-workshop-filter-small {
    display: none;
  }

.fe-filter-item {
  padding-left: 5px;
  padding-right: 5px;
}

@media screen and (max-width: 375px) {
  .fe-workshop-filter-large {
    display: none !important;
  }
  .fe-workshop-filter-small {
    display: flex;
  }
}
</style>
