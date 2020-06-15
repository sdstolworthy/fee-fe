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
    <div v-show='dataLoaded'>
      <div class="fe-post-header">
        <div class="fe-post-title">{{post.title}}</div>
        <div class="fe-post-subtitle">{{post.subtitle}}</div>
        <v-divider class="fe-section-divider"></v-divider>
        <div class="fe-post-workshop-details">
          <div class="fe-post-time">
            <span class="fe-post-contributor-label">time to complete: 1.25 hours </span>
          </div>
          <div class="fe-post-difficulty">
            <span class="fe-post-date">difficulty: beginner </span>
          </div>
        </div>
        <div class="fe-post-publish-details">
          <div class="fe-post-contributors">
            <span class="fe-post-contributor-label">contributed by:</span>
            <span class="fe-post-contributor-pill">
              <v-avatar
                size="20px"
                class="fe-post-avatar"
              >
                <img
                  alt="Avatar"
                  src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                >
                <!-- <v-icon
                  v-else
                  color="#EE0200"
                  v-text="account-circle"
                ></v-icon> -->
              </v-avatar>
              <span class="fe-post-contributor-pill-label">{{author}}</span>
            </span>
          </div>
          <div class="fe-post-date">Last update: {{postDate}}</div>
        </div>
      </div>
      <v-img
        class="hero-image"
        :src='myImage'
        :lazy-src='myPlaceholder'
        aspect-ratio="4.0"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
        </v-row>
      </template>
      </v-img>
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
    myPlaceholder() {
      if (this.post.coverImage !== null) {
        const tmp = this.post.coverImage;
        const thumb = tmp.replace('/images/', '/thumbs/');
        return thumb;
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
  line-height: normal;
}

.fe-post-subtitle {
  color: #717171;
  font-size: 1.1rem;
  line-height: normal;
  margin-top: .313rem;
  margin-bottom: .5rem;
}

.fe-post-body,
.fe-post-header {
  width: 80vw;
  max-width: 62.5rem;
  margin: auto;
}

.fe-post-publish-details,
.fe-post-workshop-details {
  display: flex;
  padding-top: .5rem;
  color: #a0a0a0;
}

.fe-post-publish-details {
  margin-top: -.5rem;
}

.fe-post-contributors,
.fe-post-time {
  width: 40vw;
}

.fe-post-contributor-pill {
  border: 1px solid #a0a0a0;
  border-radius: .625rem;
  padding: 0rem .188rem 0rem .125rem;
  padding-bottom: .25rem;
}

.fe-post-contributor-pill-label {
  font-size: .75rem;
}

.fe-post-contributor-label {
  margin-right: .313rem;
  font-size: .75rem;
}

.fe-post-avatar {
  margin-right: .313rem;
}

.fe-post-date,
.fe-post-difficulty {
  font-size: .75rem;
  width: 40vw;
  text-align: right;
  margin: auto;
}

.hero-image {
  margin-top: .625rem;
  margin-bottom: .625rem;
}
</style>
