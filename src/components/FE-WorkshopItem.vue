/* eslint-disable vue/no-parsing-error */
<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      class="mx-auto my-8 fe-card"
      width="33%"
      max-width="500"
      @click="openPost"
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


export default {
  name: 'FE-WorkshopItem',
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
      console.log(this.carddata);
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
    getTagColor(tag) {
      switch (tag) {
        case '100':
          return '#259186';
        case '200':
          return '#2077C7';
        case '300':
          return '#B65585';
        case '400':
          return '#8B5E00';
        case '500':
          return '#597100';
        default:
          return '#EE0200';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.fe-card-title {
  font-size: 1.05rem;
  font-weight: 300;
  color: #EE0200;
  padding: 4px;
}

.fe-card-tags {
  bottom: 0px;
  padding: 0.625rem;
  position: absolute;
  right: 0px;
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
  background-color: rgba(255, 255, 255, 0.9);
  position: absolute;
  width: 100%;
  height: 100%;
}

.fe-card {
  transition: all .2s ease-in-out;
}

.fe-card:hover {
  transform: scale(1.1);
  z-index: 10;
}
</style>
