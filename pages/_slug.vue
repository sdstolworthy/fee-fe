<template>
  <article class="fe-post-container">
    <nuxt-link class="fe-post-back" :to="to"> &#8592;</nuxt-link>
    <div class="fe-post-header">
      <h1 class="fe-post-title">{{ article.title }}</h1>
      <p class="fe-post-subtitle">{{ article.subtitle }}</p>
      <v-divider class="fe-section-divider"></v-divider>
      <div class="fe-post-workshop-details">
        <div class="fe-post-time">
          <span class="fe-post-contributor-label"
            >Time to Complete: 1.25 hours
          </span>
        </div>
        <div class="fe-post-date">
          Created: {{ formatDate(article.createdAt) }}
        </div>
      </div>
      <div class="fe-post-publish-details">
        <div class="fe-post-difficulty">
          <span class="fe-post-date">Difficulty: Beginner </span>
        </div>
        <div class="fe-post-date">
          Last update: {{ formatDate(article.updatedAt) }}
        </div>
      </div>
      <div class="fe-post-publish-details">
        <div class="fe-post-contributors">
          <span class="fe-post-contributor-label">Contributed by:</span>
          <span
            v-for="author in article.authors"
            :key="author.name"
            class="fe-post-contributor-pill"
          >
            <v-avatar size="20px" class="fe-post-avatar">
              <img
                v-if="author.avatar"
                alt="Avatar"
                :src="getAvatar(author.avatar)"
              />
              <v-icon v-else color="#A0A0A0">mdi-account-circle</v-icon>
            </v-avatar>
            <span class="fe-post-contributor-pill-label">
              {{ author.name }}
            </span>
          </span>
        </div>
      </div>
    </div>
    <v-img
      class="hero-image fe-post-hero-image"
      :src="myImage"
      :lazy-src="myPlaceholder"
      aspect-ratio="4.0"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
    <nuxt-content class="fe-post-body" :document="article" />

    <v-divider class="fe-section-divider"></v-divider>
    <prev-next class="fe-prev-next" :prev="prev" :next="next" />
  </article>
</template>
<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    return { article, prev, next }
  },
  computed: {
    myImage() {
      if (this.article.coverimage !== undefined) {
        if (this.article.coverimage !== null) {
          return `covers/${this.article.coverimage}`
        }
      }
      // eslint-disable-next-line global-require
      return require('@/assets/defaultimg.png')
    },
    myPlaceholder() {
      if (
        this.article.coverimage !== null &&
        this.article.coverimage !== undefined
      ) {
        return `thumbs/${this.article.coverimage}`
      }
      // eslint-disable-next-line global-require
      return require('@/assets/defaultimg.png')
    },
    to() {
      if (!this.$routerHistory || !this.$routerHistory.hasPrevious()) {
        return { path: '/' }
      }

      return { path: this.$routerHistory.previous().path }
    },
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
    getAvatar(file) {
      return `avatars/${file}`
    },
  },
}
</script>

<style lang="scss">
@import '~assets/variables.scss';

.fe-post-container {
  margin-bottom: 10px;
}

.fe-post-back {
  position: fixed;
  margin-left: 20px;
  color: $fe-highlight-color !important;
  margin-top: 3px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0 5px 0 5px;
  border-radius: 8px;
  z-index: 10;
  font-weight: 800;
  font-size: 35px;
}

.fe-post-header {
  padding: auto;
}

.fe-post-title {
  color: $body-color;
  font-size: 2.5rem;
  line-height: normal;
  width: 90%;
  margin-top: 0.5rem;
}

.fe-post-title p {
  margin: 0 !important;
}

.fe-post-subtitle {
  color: $subtitle-color;
  font-size: 1.1rem;
  line-height: normal;
  margin-top: 0.313rem;
  margin-bottom: 0.5rem;
  width: 90%;
  text-overflow: ellipsis;
}

.fe-post-body,
.fe-post-header {
  width: 80vw;
  max-width: 89.375rem;
  margin: auto;
}

.fe-post-body {
  margin-bottom: 10px;
}

.fe-post-publish-details,
.fe-post-workshop-details {
  display: flex;
  padding-top: 0.5rem;
  color: $stat-color;
}

.fe-post-publish-details {
  margin-top: -0.5rem;
}

.fe-post-contributors,
.fe-post-time,
.fe-post-difficulty {
  width: 40vw;
}

.fe-post-contributor-pill {
  border: 0.031rem solid $stat-color;
  border-radius: 0.625rem;
  padding: 0 0.2rem 0.2rem 0.05rem;
}

.fe-post-contributor-pill-label {
  font-size: 0.75rem;
}

.fe-post-contributor-label {
  margin-right: 0.313rem;
  font-size: 0.75rem;
}

.fe-post-avatar {
  margin-right: 0.125rem;
  margin-left: 0.125rem;
}

.fe-post-date {
  font-size: 0.75rem;
  width: 40vw;
  text-align: right;
  margin: auto;
}

.fe-edit-icon {
  position: fixed;
  right: 10%;
  top: 70px;
  z-index: 4;
}

.fe-post-hero-image {
  margin-top: 0.65rem;
  margin-bottom: 0.65rem;
}

.fe-post-title.ck.ck-editor__editable_inline > :last-child {
  margin: 0;
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

@media (max-width: 750px) {
  .fe-post-title {
    font-size: 2rem;
  }

  .fe-post-subtitle {
    font-size: 0.95rem;
  }

  .fe-post-date,
  .fe-post-difficulty,
  .fe-post-contributor-pill-label,
  .fe-post-contributor-label,
  .fe-post-time {
    font-size: 0.7rem;
  }
}

@media (max-width: 400px) {
  .fe-post-title {
    font-size: 1.5rem;
  }

  .fe-post-subtitle {
    font-size: 0.8rem;
    margin-top: 0.313rem;
    margin-bottom: 0.5rem;
  }

  .fe-post-workshop-details,
  .fe-post-publish-details,
  .fe-post-contributors {
    display: inline-block;
    width: 100%;
    padding: 0;
  }

  .fe-post-date,
  .fe-post-difficulty,
  .fe-post-contributor-pill-label,
  .fe-post-contributor-label,
  .fe-post-time {
    font-size: 0.6rem;
    width: 100%;
    text-align: left;
    padding: 0;
    line-height: 1rem;
  }

  .fe-post-contributor-pill {
    border: none;
    padding: 0;
  }

  .fe-post-avatar {
    display: none;
  }
}
</style>
