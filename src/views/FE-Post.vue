<template>
  <div class="fe-post-container">
    <div class="fe-practices-loader">
      <v-progress-circular
      :size="70"
      :width="7"
      class="fe-practices-loader"
      v-show='!dataLoaded'
      indeterminate
      ></v-progress-circular>
    </div>
    <div v-show='post'>
      <div class="fe-post-header">
        <div class="fe-post-title">{{post.title}}</div>
        <div class="fe-post-subtitle">{{post.subtitle}}</div>
        <span>{{author}}</span>
        <br/>
        <span>Last update: {{postDate}}</span>
      </div>
      <v-img
        class="hero-image"
        :src='myImage'
        aspect-ratio="4.0"
      ></v-img>
      <div class="fe-post-body" v-if='dataLoaded'>
        <vue-markdown
          :source="post.body.fullText">
        </vue-markdown>
        <v-divider class="fe-section-divider"></v-divider>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon';
import VueMarkdown from 'vue-markdown';
import { GET_WORKSHOP } from '@/assets/serviceApi/queries.js';

export default {
  name: 'Post',
  components: {
    VueMarkdown,
  },
  props: {
    slug: null,
  },
  data() {
    return {
      post: {},
      dataLoaded: false,
    };
  },
  watch: {
    practices() {
      this.dataLoaded = true;
      // eslint-disable-next-line prefer-destructuring
      this.post = this.practices[0];
    },
  },
  computed: {
    myImage() {
      if (this.post.coverImage !== undefined) {
        if (this.post.coverImage !== null) {
          return `${this.post.coverImage}`;
        }
      }
      // eslint-disable-next-line global-require
      return require('@/assets/defaultimg.png');
    },
    author() {
      if (this.post.authors) {
        return `${this.post.authors[0].firstName} ${this.post.authors[0].lastName}`;
      }
      return '';
    },
    postDate() {
      const dt = DateTime.fromISO(this.post.updatedAt);
      return dt.setLocale('en-US').toLocaleString(DateTime.DATE_FULL);
    },
  },
  apollo: {
    practices: {
      query: GET_WORKSHOP,
      variables() {
        return {
          post: this.slug,
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.fe-post-header {
  padding: auto;
}

.fe-post-title {
  color: #2e2e2e;
  font-size: 2.5rem;
}

.fe-post-subtitle {
  color: #717171;
  font-size: 1.25rem;
  font-style: italic;
}

.fe-post-body,
.fe-post-header {
  padding-top: 20px;
  width: 80vw;
  max-width: 1000px;
  margin: auto;
  margin-bottom: 20px;
}
</style>
