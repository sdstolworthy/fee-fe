<template>
  <div class="fe-card-stat-container">
    <v-icon small class="fe-card-stat-icon">mdi-chat-outline</v-icon> {{count}}
  </div>
</template>

<script>
export default {
  name: 'FE-CommentCount',
  props: {
    count: Number,
  },
};
</script>
