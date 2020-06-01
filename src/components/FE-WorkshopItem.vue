/* eslint-disable vue/no-parsing-error */
<template>
  <v-card
    class="mx-auto my-8"
    width="33%"
    max-width="500"
    @click="openPost"
  >
    <v-img
      :src='myImage'
      aspect-ratio="2.0"
    >
      <!-- <o-upvote :count="carddata.upvotes"></o-upvote>
      <o-comment-count :count="carddata.comments.length"></o-comment-count> -->
    </v-img>
    <v-card-title>{{carddata.title}}</v-card-title>
  </v-card>
</template>

<script>
// import OUpvote from '@/components/O-Upvote.vue';
// import OCommentCount from '@/components/O-CommentCount.vue';


export default {
  name: 'FE-WorkshopItem',
  components: {
    // OUpvote,
    // OCommentCount,
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
.v-card__title {
  font-size: 1rem;
  margin-top: -15px;
}
</style>
