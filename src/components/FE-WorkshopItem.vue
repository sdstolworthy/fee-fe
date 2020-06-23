/* eslint-disable vue/no-parsing-error */
<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      class="mx-auto my-2 fe-card"
      width="33%"
      max-width="500"
      @click="openPost"
      outlined
    >
      <v-img
        :src='myImage'
        aspect-ratio="2.0"
      >
        <v-expand-transition>
          <div
            v-if="hover"
            class="
              d-flex
              transition-fast-in-fast-out
              fe-card-reveal"
          >
            <span class="fe-card-tags">
              <v-chip
                v-for="tag in carddata.tags"
                :key="tag.tag"
                x-small
                :color="getTagColor(tag.tag)"
                text-color="white"
                class="fe-card-tag"
              >
                {{ tag.tag }}
              </v-chip>
            </span>
            <span class="fe-card-stats">
              <fe-upvote :count="carddata.upvotes"></fe-upvote>
              <fe-comment-count :count="carddata.ama.length"></fe-comment-count>
            </span>
            <span class="fe-card-subtitle">{{carddata.subtitle}}</span>
            <span class="fe-card-authors"><b>contributed by:</b>
              <span v-for="author in carddata.authors" :key="author.id">
                {{author.firstName}}
                {{author.lastName}}
              </span>
            </span>
          </div>
        </v-expand-transition>
      </v-img>
      <div class="fe-card-title font-weight-light mb-1">{{carddata.title}}</div>
    </v-card>
  </v-hover>
</template>

<script>
import FeUpvote from '@/components/FE-Upvote.vue';
import FeCommentCount from '@/components/FE-CommentCount.vue';
import getTagColor from '@/mixins/getTagColor.js';

export default {
  name: 'FE-WorkshopItem',
  mixins: [getTagColor],
  components: {
    FeUpvote,
    FeCommentCount,
  },
  props: {
    carddata: Object,
  },
  data() {
    return {};
  },
  computed: {
    myImage() {
      if (this.carddata.coverImage !== null) {
        const tmp = this.carddata.coverImage;
        const thumb = tmp.replace('/images/', '/thumbs/');
        return thumb;
      }
      // eslint-disable-next-line global-require
      return require('@/assets/defaultimg.png');
    },
  },
  methods: {
    openPost() {
      this.$router.push({ name: 'workshop', params: { slug: this.carddata.slug } });
    },
  },
};
</script>

<style lang="scss" scoped>
.fe-card-title {
  transition: all .2s ease-in-out;
  font-size: 1.05rem;
  font-weight: 300;
  color: #2e2e2e;
  padding: 4px;
}

.fe-card-tags {
  top: 0px;
  padding: 0.625rem;
  position: absolute;
  left: 0px;
  max-width: 50%;
}

.fe-card-tag {
  margin-left: 0.313rem;
}

.fe-card-stats {
  top: 0px;
  padding: 0.625rem;
  position: absolute;
  right: 0px;

}

.fe-card-subtitle {
  color: rgba(0, 0, 0, 0.75);
  font-size: .75rem;
  padding: 0.625rem;
}

.fe-card-authors {
  font-size: .6rem;
  bottom: 0px;
  padding: 0.625rem;
  left: 0px;
  position: absolute;
  max-width: 50%;
}

.fe-card-reveal {
  align-items: center;
  bottom: 0px;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.85);
  position: absolute;
  width: 100%;
  height: 100%;
}

.fe-card {
  transition: all .2s ease-in-out;
  border: thin solid #ffffff !important;
}

.fe-card:hover {
  transform: scale(1.1);
  z-index: 10;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
              0px 2px 2px 0px rgba(0, 0, 0, 0.14),
              0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.fe-card:hover .fe-card-title{
  color: red;
}
</style>
