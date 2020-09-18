<template>
  <div class="flex justify-between">
    <NuxtLink
      v-if="prev"
      :to="prev.slug"
      class="text-primary font-bold hover:underline fe-prev"
    >
      &#8592; {{ prev.title }}
    </NuxtLink>
    <span v-else>&nbsp;</span>
    <v-spacer></v-spacer>
    <NuxtLink
      v-if="next"
      :to="next.slug"
      class="font-bold hover:underline fe-next"
    >
      {{ next.title }} &#8594;
    </NuxtLink>
    <span v-else>&nbsp;</span>
  </div>
</template>

<script>
export default {
  props: {
    prev: {
      type: Object,
      default: () => null,
    },
    next: {
      type: Object,
      default: () => null,
    },
  },
}
</script>
