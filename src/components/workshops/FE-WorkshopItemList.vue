/* eslint-disable vue/no-parsing-error */
<template>
  <div class="fe-li">
  <v-list-item @click="openPost">
    <v-img
      class='fe-li-img'
      :src='myImage'
      aspect-ratio="2.0"
    ></v-img>
    <v-list-item-content>
      <v-list-item-title v-text="carddata.title"></v-list-item-title>
      <v-list-item-subtitle class="text--primary" v-text="carddata.subtitle"></v-list-item-subtitle>
      <v-list-item-subtitle>
        <span class="fe-card-authors"><b>contributed by:</b>
          <span v-for="author in carddata.authors" :key="author.id">
            {{author.firstName}}
            {{author.lastName}}
          </span>
        </span>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
       <span class="fe-card-stats">
          <fe-upvote :count="carddata.upvotes"></fe-upvote>
          <fe-comment-count :count="carddata.ama.length"></fe-comment-count>
        </span>
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
    </v-list-item-action>
  </v-list-item>
  <v-divider></v-divider>
  </div>
</template>

<script>
import FeUpvote from '@/components/FE-Upvote.vue';
import FeCommentCount from '@/components/FE-CommentCount.vue';
import getTagColor from '@/mixins/getTagColor.js';

export default {
  name: 'FE-WorkshopItemList',
  mixins: [getTagColor],
  components: {
    FeUpvote,
    FeCommentCount,
  },
  props: {
    carddata: Object,
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
@import "@/styles/vars.scss";
.fe-li {
  width: 80vw;
  max-width: 87rem;
}

.fe-li-img{
  max-width: 12.5rem;
  margin-right: 0.625rem;
  border-radius: .25rem;
  margin: .25rem 0.625rem .25rem 0rem;
}
.fe-card-tags {
  bottom: 0.1rem;
  position: absolute;
}

.fe-card-tag {
  margin-left: 0.313rem;
}

.v-list-item,
.v-list-item__action,
.v-list-item__content {
  padding: 0px;
}

@media (max-width:78.125rem) {
  .fe-li-img {
    max-width: 9.375rem;
  }
}

@media (max-width:62.5rem) {
  .fe-li-img {
    max-width: 6.25rem;
  }
}

@media (max-width:31.25rem) {
  .fe-li-img {
    display: none;
  }
}
</style>
