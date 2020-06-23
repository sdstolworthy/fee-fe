<template>
  <v-container fluid>
    <v-combobox
      v-model="model"
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
          <v-chip
            :color="getTagColor(search)"
            x-small
          >
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
          text-color=#ffffff
        >
          <span class="pr-2">
            {{ item }}
          </span>
          <v-icon
            x-small
            @click="parent.selectItem(item)"
          >mdi-close</v-icon>
        </v-chip>
      </template>
      <template v-slot:item="{ item }">
        <v-chip
          :color="getTagColor(item)"
          dark
          x-small
        >
          {{ item }}
        </v-chip>
      </template>
    </v-combobox>
  </v-container>
</template>

<script>
import getTagColor from '@/mixins/getTagColor.js';

export default {
  name: 'FE-WorkshopFilter',
  mixins: [getTagColor],
  props: {
    items: Array,
  },
  data: () => ({
    activator: null,
    attach: null,
    model: [],
    search: null,
  }),
  watch: {
    model(val, prev) {
      if (val.length === prev.length) return;

      this.model = val.map((v) => v);
      this.$emit('update', this.model);
    },
  },
  methods: {
    filter(item, queryText, itemText) {
      const hasValue = (val) => (val != null ? val : '');

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1;
    },
  },
};
</script>

<style lang="scss" scoped>
.subheading {
  margin-right: 5px;
}

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
