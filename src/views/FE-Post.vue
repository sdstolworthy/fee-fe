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
      <div
        class="fe-dialog-loader-background"
        v-show='loading'
      ></div>
      <v-progress-circular
        :size="40"
        :width="7"
        class="fe-dialog-loader"
        v-show='loading'
        indeterminate
      ></v-progress-circular>
      <fe-edit-toggle
        class='fe-edit-icon'
        v-show="this.$store.state.user"
        @updateeditmode="onEditModeSelection"
      ></fe-edit-toggle>
      <div class="fe-post-header">
        <input
          class="fe-post-title"
          v-model="post.title"
          :disabled='editorDisabled'
          @blur='onBodyBlur'
        />
        <input
          class="fe-post-subtitle"
          v-model="post.subtitle"
          :disabled='editorDisabled'
          @blur='onBodyBlur'
        />
        <v-divider class="fe-section-divider"></v-divider>
        <div class="fe-post-workshop-details">
          <div class="fe-post-time">
            <span class="fe-post-contributor-label">Time to Complete: 1.25 hours </span>
          </div>
          <div class="fe-post-date">Created: {{postDate}}</div>
        </div>
        <div class="fe-post-publish-details">
          <div class="fe-post-difficulty">
            <span class="fe-post-date">Difficulty: Beginner </span>
          </div>
          <div class="fe-post-date">Last update: {{updateDate}}</div>
        </div>
        <div class="fe-post-publish-details">
          <div class="fe-post-contributors">
            <span class="fe-post-contributor-label">Contributed by:</span>
            <span
              v-for="author in post.authors"
              :key="author.id"
              class="fe-post-contributor-pill">
              <v-avatar
                size="20px"
                class="fe-post-avatar"
              >
                <img
                  v-if="author.Avatar"
                  alt="Avatar"
                  :src="author.Avatar"
                >
                <v-icon
                  v-else
                  color="#A0A0A0"
                >mdi-account-circle</v-icon>
              </v-avatar>
              <span class="fe-post-contributor-pill-label">
                {{author.firstName}} {{author.lastName}}
              </span>
            </span>
          </div>
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
        <ckeditor
          class='fe-inline-editor'
          :editor="editor"
          v-model='converted'
          :disabled='editorDisabled'
          @blur='onBodyBlur'
        ></ckeditor>
        <v-divider class="fe-section-divider"></v-divider>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon';
import CKEditor from '@ckeditor/ckeditor5-vue';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { GET_WORKSHOP, UPDATE_WORKSHOP } from '@/assets/serviceApi/queries.js';
import showdown from 'showdown';
import FeEditToggle from '@/components/FE-EditToggle.vue';

export default {
  name: 'Post',
  components: {
    FeEditToggle,
    ckeditor: CKEditor.component,
  },
  props: {
    slug: null,
  },
  data() {
    return {
      post: {},
      dataLoaded: false,
      converted: '',
      editor: InlineEditor,
      editorConfig: {
        toolbar: {
          items: [
            'bold',
            'italic',
          ],
        },
      },
      editorDisabled: true,
      loading: false,
    };
  },
  methods: {
    onEditModeSelection(val) {
      this.editorDisabled = !val;
    },
    onBodyBlur() {
      const converter = new showdown.Converter();
      const marked = converter.makeMarkdown(this.converted);
      this.submitUpdate(marked);
    },
    async submitUpdate(update) {
      try {
        this.loading = true;
        this.$apollo.mutate({
          mutation: UPDATE_WORKSHOP,
          variables: {
            practiceId: this.post.id,
            title: this.post.title,
            subtitle: this.post.subtitle,
            fullText: update,
          },
          update: ({ data }) => {
            this.post.updatedAt = data.updatedAt;
            this.loading = false;
          },
        });
      } catch (err) {
        this.loading = false;
        // eslint-disable-next-line no-alert
        alert(err.message || 'An error occurred.');
      }
    },
  },
  watch: {
    practices() {
      this.dataLoaded = true;
      // eslint-disable-next-line prefer-destructuring
      this.post = this.practices[0];
      const converter = new showdown.Converter();
      this.converted = converter.makeHtml(this.post.body.fullText);
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
      if (this.post.coverImage !== null && this.post.coverImage !== undefined) {
        const tmp = this.post.coverImage;
        const thumb = tmp.replace('/images/', '/thumbs/');
        return thumb;
      }
      // eslint-disable-next-line global-require
      return require('@/assets/defaultimg.png');
    },
    postDate() {
      const dt = DateTime.fromISO(this.post.createdAt);
      return dt.setLocale('en-US').toLocaleString(DateTime.DATE_FULL);
    },
    updateDate() {
      const dt = DateTime.fromISO(this.post.updatedAt);
      return dt.setLocale('en-US').toLocaleString(DateTime.DATE_FULL);
    },
    postTitle() {
      if (this.post.title !== undefined) {
        console.log(this.post.title);
        return this.post.title;
      }
      return '';
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
@import "@/styles/vars.scss";

.fe-post-header {
  padding: auto;
}

.fe-post-title {
  color: $body-color;
  font-size: 2.5rem;
  line-height: normal;
  width: 90%;
  margin-top: .5rem;
}

.fe-post-title p{
  margin: 0rem !important;
}

.fe-post-subtitle {
  color: $subtitle-color;
  font-size: 1.1rem;
  line-height: normal;
  margin-top: .313rem;
  margin-bottom: .5rem;
  width: 90%;
  text-overflow: ellipsis;
}

.fe-post-body,
.fe-post-header {
  width: 80vw;
  max-width: 89.375rem;
  margin: auto;
}

.fe-post-publish-details,
.fe-post-workshop-details {
  display: flex;
  padding-top: .5rem;
  color: $stat-color;
}

.fe-post-publish-details {
  margin-top: -.5rem;
}

.fe-post-contributors,
.fe-post-time,
.fe-post-difficulty {
  width: 40vw;
}

.fe-post-contributor-pill {
  border: 0.031rem solid $stat-color;
  border-radius: .625rem;
  padding: 0rem .2rem 0.2rem .05rem;
}

.fe-post-contributor-pill-label {
  font-size: .75rem;
}

.fe-post-contributor-label {
  margin-right: .313rem;
  font-size: .75rem;
}

.fe-post-avatar {
  margin-right: .125rem;
  margin-left: .125rem;
}

.fe-post-date {
  font-size: .75rem;
  width: 40vw;
  text-align: right;
  margin: auto;
}

.hero-image {
  margin-top: .625rem;
  margin-bottom: .625rem;
}

.fe-edit-icon {
  position: fixed;
  right: 10%;
  top: 70px;
  z-index: 4;
}

.ck.ck-editor__editable_inline {
  padding: 0;
  border: none;

}

.fe-post-title.ck.ck-editor__editable_inline>:last-child {
  margin:0rem;
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

@media (max-width:750px) {
  .fe-post-title {
    font-size: 2rem;
  }

  .fe-post-subtitle {
    font-size: .95rem;
  }

  .fe-post-date,
  .fe-post-difficulty,
  .fe-post-contributor-pill-label,
  .fe-post-contributor-label,
  .fe-post-time {
    font-size: .7rem;
  }
}

@media (max-width:400px) {
  .fe-post-title {
    font-size: 1.5rem;
  }

  .fe-post-subtitle {
    font-size: .8rem;
    margin-top: .313rem;
    margin-bottom: .5rem;
  }

  .fe-post-workshop-details,
  .fe-post-publish-details,
  .fe-post-contributors {
    display: inline-block;
    width: 100%;
    padding: 0px;
  }

  .fe-post-date,
  .fe-post-difficulty,
  .fe-post-contributor-pill-label,
  .fe-post-contributor-label,
  .fe-post-time {
    font-size: .6rem;
    width: 100%;
    text-align: left;
    pading: 0px;
    line-height: 1rem;
  }

  .fe-post-contributor-pill {
    border: none;
    padding: 0px;
  }

  .fe-post-avatar {
    display: none;
  }
}
</style>
