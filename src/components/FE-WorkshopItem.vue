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
        return `${this.carddata.coverImage}`;
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
  font-size: 1.05rem;
  font-weight: 300;
  color: #EE0200;
  padding: 4px;
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
