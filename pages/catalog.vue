/* eslint-disable no-console */
<template>
  <div>
    <!-- <v-img src="catalog.jpg" class="hero-image"></v-img> -->
    <div class="fe-workshop-wrap">
      <fe-workshop-filter
        :items="tags"
        @updatefilter="onFilterSelection"
        @updateview="onViewSelection"
        @updatefiltertype="onFilterType"
      ></fe-workshop-filter>
      <fe-workshop-pane :view="catalogView" :workshop-items="filteredList">
      </fe-workshop-pane>
    </div>
  </div>
</template>

<script>
import FeWorkshopFilter from '~/components/workshops/FE-WorkshopFilter.vue'
import FeWorkshopPane from '~/components/workshops/FE-WorkshopPane.vue'

export default {
  name: 'FEWorkshopCatalog',
  components: {
    FeWorkshopFilter,
    FeWorkshopPane,
  },
  async asyncData({ $content, params }) {
    const articles = await $content('articles').fetch()
    articles.sort((a, b) => {
      return a.order - b.order
    })
    return { articles }
  },
  data() {
    return {
      tagFilter: [],
      catalogView: '',
      filterType: false,
    }
  },
  computed: {
    filteredList() {
      if (this.tagFilter.length === 0) {
        return this.articles
      }
      return this.articles.filter((post) => {
        console.log(post)
        const postTags = post.tags.map((x) => x)

        const checkAll = (arr, target) => target.every((v) => arr.includes(v))
        let found
        if (this.filterType) {
          found = checkAll(postTags, this.tagFilter)
        } else {
          found = post.tags.some((v) => this.tagFilter.includes(v))
        }
        return found
      })
    },
    tags() {
      let filtered = []
      if (this.articles) {
        const result = this.articles.map((article) => {
          return article.tags
        })
        const flattenedArray = [].concat(...result)
        filtered = flattenedArray.reduce(
          (unique, item) =>
            unique.includes(item) ? unique : [...unique, item],
          []
        )
        filtered.sort()
      }
      return filtered
    },
  },
  methods: {
    openPost() {
      this.$router.push({ name: 'post', params: { slug: 'event-storming' } })
    },
    onFilterSelection(newData) {
      this.tagFilter = newData
    },
    onViewSelection(view) {
      this.catalogView = view
    },
    onFilterType(val) {
      this.filterType = val
    },
  },
}
</script>

<style lang="scss" scoped>
.fe-workshop-wrap {
  width: calc(80vw + 1.875rem);
  max-width: 89.375rem;
  margin: auto;
  display: flex;
  flex-direction: column;
}
</style>
