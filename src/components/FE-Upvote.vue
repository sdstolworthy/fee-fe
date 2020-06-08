<template>
  <div class="fe-card-stat-container">
    <v-icon small class="fe-card-stat-icon">mdi-heart</v-icon> {{count}}
  </div>
</template>

<script>
export default {
  name: 'FE-Upvote',
  props: {
    count: Number,
  },
};
</script>
