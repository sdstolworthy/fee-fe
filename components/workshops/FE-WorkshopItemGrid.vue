/* eslint-disable vue/no-parsing-error */
<template>
  <v-hover v-slot:default="{ hover }">
    <nuxt-link :to="{ name: 'slug', params: { slug: carddata.slug } }">
      <v-card class="mx-auto my-2 fe-card" max-width="500" outlined>
        <v-img :src="myImage" aspect-ratio="2.0">
          <v-expand-transition>
            <div
              v-if="hover"
              class="d-flex transition-fast-in-fast-out fe-card-reveal"
            >
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
              <span class="fe-card-subtitle">{{ carddata.subtitle }}</span>
              <span class="fe-card-authors"
                ><b>contributed by:</b>
                <span v-for="author in carddata.authors" :key="author.name">
                  {{ author.name }}
                </span>
              </span>
            </div>
          </v-expand-transition>
        </v-img>
        <div class="fe-card-title font-weight-light mb-1">
          {{ carddata.title }}
        </div>
      </v-card>
    </nuxt-link>
  </v-hover>
</template>

<script>
import getTagColor from '@/mixins/getTagColor.js'

export default {
  name: 'FEWorkshopItemGrid',
  mixins: [getTagColor],
  props: {
    carddata: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {}
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
        name: '/',
        params: { name: 'slug', slug: this.carddata.slug },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

.fe-card-title {
  transition: all 0.2s ease-in-out;
  font-size: 1.05rem;
  font-weight: 300;
  color: $body-color;
  padding: 4px;
}

.fe-card-tags {
  top: 0;
  padding: 0.625rem;
  position: absolute;
  left: 0;
  max-width: 50%;
}

.fe-card-tag {
  margin-left: 0.313rem;
}

.fe-card-stats {
  top: 0;
  padding: 0.625rem;
  position: absolute;
  right: 0;
}

.fe-card-subtitle {
  color: rgba(0, 0, 0, 0.75);
  font-size: 0.75rem;
  padding: 0.625rem;
}

.fe-card-authors {
  font-size: 0.6rem;
  bottom: 0;
  padding: 0.625rem;
  left: 0;
  position: absolute;
  max-width: 50%;
}

.fe-card-reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.85);
  position: absolute;
  width: 100%;
  height: 100%;
}

.fe-card {
  transition: all 0.2s ease-in-out;
  border: thin solid #fff !important;
}

.fe-card:hover {
  // transform: scale(1.1);
  // z-index: 10;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.fe-card:hover .fe-card-title {
  color: $fe-highlight-color;
}
</style>
