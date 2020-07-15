<template>
  <v-container class="fe-workshop-filter-large" fluid>
    <v-btn-toggle
      v-model="viewModel"
      mandatory
      class="fe-catalog-view"
    >
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
    <v-switch
      v-model="filterType"
      class="filter-switch"
      :label="`and`"
      small
    >
      <small></small>
    </v-switch>
    <v-btn
      class='fe-create-btn'
      outlined
      x-small
      color="#EE0200"
      v-show="this.$store.state.user"
      @click="createDialog=true"
    >
      Create New
    </v-btn>
    <v-dialog
      v-model="createDialog"
      max-width="450"
    >
      <v-card>
        <div
          class="fe-dialog-loader-background"
          v-show='loading'></div>
        <v-progress-circular
        :size="40"
        :width="7"
        class="fe-dialog-loader"
        v-show='loading'
        indeterminate
        ></v-progress-circular>
        <v-card-title class="headline">Create Workshop</v-card-title>

        <v-card-text>
          Please enter a title and a slug for your workshop.
        </v-card-text>
        <v-card-text>
          <v-text-field
            label="title"
            v-model='newArticleTitle'
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            label="slug"
            v-model="newArticleSlug"
            :rules="[rules.required]"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="cancelCreateNew"
          >
            Cancel
          </v-btn>

          <v-btn
            color='blue darken-1'
            text
            primary
            @click="createNewPost"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import getTagColor from '@/mixins/getTagColor.js';
import { CREATE_WORKSHOP } from '@/assets/serviceApi/queries.js';

export default {
  name: 'FE-WorkshopFilter',
  mixins: [getTagColor],
  props: {
    items: Array,
  },
  data: () => ({
    activator: null,
    attach: null,
    tagModel: [],
    search: null,
    newArticleTitle: 'New Workshop',
    newArticleSlug: 'new-workshop',
    viewModel: undefined,
    filterType: false,
    createDialog: false,
    loading: false,
    rules: {
      required: (value) => !!value || 'Required.',
      // min: (v) => v.length >= 8 || 'Min 8 characters',
      // emailMatch: () => ('The email/user and password you entered don\'t match'),
    },
  }),
  watch: {
    tagModel(val, prev) {
      if (val.length === prev.length) return;

      this.tagModel = val.map((v) => v);
      this.$emit('updatefilter', this.tagModel);
    },
    viewModel(val) {
      let type = 'grid';

      if (val === 1) {
        type = 'list';
      }
      this.$emit('updateview', type);
    },
    filterType(val) {
      this.$emit('updatefiltertype', val);
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
    cancelCreateNew() {
      this.createDialog = false;
      this.newArticleTitle = 'New Workshop';
      this.newArticleSlug = 'new-workshop';
    },
    async createNewPost() {
      try {
        this.loading = true;
        this.$apollo.mutate({
          mutation: CREATE_WORKSHOP,
          variables: {
            title: this.newArticleTitle,
            subtitle: 'Workshop Subtitle',
            fullText: 'Workshop text goes here.',
            slug: this.newArticleSlug,
            authorsId: this.$store.state.user.id,
          },
          update: () => {
            this.loading = false;
            this.createDialog = false;
            this.newArticleTitle = 'New Workshop';
            this.newArticleSlug = 'new-workshop';
            this.$router.push({ name: 'workshop', params: { slug: this.newArticleSlug } });
          },
        });
      } catch (err) {
        this.loading = false;
        // eslint-disable-next-line no-alert
        alert(err.message || 'An error occurred.');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/vars.scss";

.subheading {
  margin-right: 5px;
}

.fe-workshop-filter-large{
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

.fe-dialog-loader {
  position: absolute;
  line-height: 100%;
  margin-right: 50%;
  margin-left: 50%;
  top: calc(50% - 20px);
  z-index: 10;
  color: $fe-highlight-color;
}

.fe-dialog-loader-background {
  z-index: 10;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: $fe-modal-background-color;
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
