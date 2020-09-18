/* eslint-disable vue/no-parsing-error */
<template>
  <div class="fe-li">
    <NuxtLink :to="{ name: 'slug', params: { slug: carddata.slug } }">
      <v-list-item>
        <v-img class="fe-li-img" :src="myImage" aspect-ratio="2.0"></v-img>
        <v-list-item-content>
          <v-list-item-title v-text="carddata.title"></v-list-item-title>
          <v-list-item-subtitle
            class="text--primary"
            v-text="carddata.subtitle"
          ></v-list-item-subtitle>
          <v-list-item-subtitle>
            <span class="fe-card-authors"
              ><b>contributed by:</b>
              <span v-for="author in carddata.authors" :key="author.name">
                {{ author.name }}
              </span>
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content>
          <span class="fe-card-tags">
            <v-chip
              v-for="tag in carddata.tags"
              :key="tag"
              x-small
              :color="getTagColor(tag)"
              text-color="white"
              class="fe-card-tag"
            >
              {{ tag }}
            </v-chip>
          </span>
        </v-list-item-content>
      </v-list-item>
    </NuxtLink>
    <v-divider></v-divider>
  </div>
</template>

<script>
import getTagColor from '@/mixins/getTagColor.js'

export default {
  name: 'FEWorkshopItemList',
  mixins: [getTagColor],
  props: {
    carddata: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    myImage() {
      if (this.carddata.coverimage) {
        return `thumbs/${this.carddata.coverimage}`
      }
      // eslint-disable-next-line global-require
      return require('@/assets/defaultimg.png')
    },
  },
  methods: {
    openPost() {
      this.$router.push({
        name: 'workshop',
        params: { slug: this.carddata.slug },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/variables.scss';
.fe-li {
  width: 80vw;
  max-width: 87rem;
}

.fe-li-img {
  max-width: 12.5rem;
  border-radius: 0.25rem;
  margin: 0.25rem 0.625rem 0.25rem 0;
}
.fe-card-tags {
  bottom: 0.1rem;
  position: absolute;
  right: 5px;
}

.fe-card-tag {
  margin-left: 0.313rem;
}

.v-list-item,
.v-list-item__action,
.v-list-item__content {
  padding: 0;
}

@media (max-width: 78.125rem) {
  .fe-li-img {
    max-width: 9.375rem;
  }
}

@media (max-width: 62.5rem) {
  .fe-li-img {
    max-width: 6.25rem;
  }
}

@media (max-width: 31.25rem) {
  .fe-li-img {
    display: none;
  }
}
</style>
