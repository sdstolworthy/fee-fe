<template>
  <div class="fe-catalog-pane">
    <div v-show="view === 'grid'" class="fe-workshop-pane-grid">
      <fe-workshop-item-grid
        v-for="item in workshopItems"
        :key="item.id"
        class="fe-workshop-grid-item"
        :carddata="item"
      >
      </fe-workshop-item-grid>
    </div>
    <div v-show="view === 'list'" class="fe-workshop-pane-list">
      <v-list two-line>
        <v-list-item-group>
          <fe-workshop-item-list
            v-for="item in workshopItems"
            :key="item.id"
            :carddata="item"
          >
          </fe-workshop-item-list>
        </v-list-item-group>
      </v-list>
    </div>
  </div>
</template>

<script>
import FeWorkshopItemGrid from '@/components/workshops/FE-WorkshopItemGrid.vue'
import FeWorkshopItemList from '@/components/workshops/FE-WorkshopItemList.vue'

export default {
  name: 'FEWorkshopPane',
  components: {
    FeWorkshopItemGrid,
    FeWorkshopItemList,
  },
  props: {
    workshopItems: {
      type: Array,
      default() {
        return []
      },
    },
    view: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.fe-catalog-pane {
  overflow: scroll;
}

.fe-workshop-pane-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex: 1;
}

.fe-workshop-grid-item {
  margin: auto;
  flex: 0 1 calc(33% - 1em);
  min-width: 290px;
}
</style>
