<template>
  <v-container class="fe-workshop-filter-large" fluid>
    <v-btn-toggle v-model="viewModel" mandatory class="fe-catalog-view">
      <v-btn small>
        <v-icon small>mdi-view-grid</v-icon>
      </v-btn>
      <v-btn small>
        <v-icon small>mdi-format-list-text</v-icon>
      </v-btn>
    </v-btn-toggle>
    <v-combobox
      v-model="tagModel"
      :filter="filter"
      :hide-no-data="!search"
      :items="items"
      :search-input.sync="search"
      hide-selected
      label="Filter by tags"
      multiple
      small-chips
    >
      <template v-slot:no-data>
        <v-list-item>
          <span class="subheading">Create</span>
          <v-chip :color="getTagColor(search)" x-small>
            {{ search }}
          </v-chip>
        </v-list-item>
      </template>
      <template v-slot:selection="{ attrs, item, parent, selected }">
        <v-chip
          v-if="item === item"
          v-bind="attrs"
          :color="getTagColor(item)"
          :input-value="selected"
          x-small
          text-color="#ffffff"
        >
          <span class="pr-2">
            {{ item }}
          </span>
          <v-icon x-small @click="parent.selectItem(item)">mdi-close</v-icon>
        </v-chip>
      </template>
      <template v-slot:item="{ item }">
        <v-chip :color="getTagColor(item)" dark x-small>
          {{ item }}
        </v-chip>
      </template>
    </v-combobox>
    <v-switch v-model="filterType" class="filter-switch" :label="`and`" small>
      <small></small>
    </v-switch>
  </v-container>
</template>

<script>
import getTagColor from '@/mixins/getTagColor.js'

export default {
  name: 'FEWorkshopFilter',
  mixins: [getTagColor],
  props: {
    items: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data: () => ({
    tagModel: [],
    search: null,
    viewModel: undefined,
    filterType: false,
  }),
  watch: {
    tagModel(val, prev) {
      if (val.length === prev.length) return

      this.tagModel = val.map((v) => v)
      this.$emit('updatefilter', this.tagModel)
    },
    viewModel(val) {
      let type = 'grid'

      if (val === 1) {
        type = 'list'
      }
      this.$emit('updateview', type)
    },
    filterType(val) {
      this.$emit('updatefiltertype', val)
    },
  },
  methods: {
    filter(item, queryText, itemText) {
      const hasValue = (val) => (val != null ? val : '')

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return text
        .toString()
        .toLowerCase()
        .includes(query.toString().toLowerCase())
    },
    cancelCreateNew() {
      this.createDialog = false
      this.newArticleTitle = 'New Workshop'
      this.newArticleSlug = 'new-workshop'
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/variables.scss';

.subheading {
  margin-right: 5px;
}

.fe-workshop-filter-large {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.fe-catalog-view {
  margin-top: 20px;
  margin-right: 10px;
}

.fe-catalog-filter {
  display: flex;
}

.fe-workshop-filter-small {
  display: none;
}

.fe-filter-item {
  padding-left: 5px;
  padding-right: 5px;
}

.fe-filter-switch {
  margin-top: 15px;
  padding-left: 10px;
}

.fe-create-btn {
  margin-left: 10px;
  margin-top: 22px;
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
