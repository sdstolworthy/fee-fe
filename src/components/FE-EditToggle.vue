<template>
  <div>
    <v-icon
      v-show='!editMode'
      class='fe-edit-icon'
      color="#A0A0A0"
      @click='toggleEdit'
    >
        mdi-pencil-outline
    </v-icon>
    <v-icon
      v-show='editMode'
      class='fe-edit-icon'
      color="#EE0200"
      @click='toggleEdit'
    >
        mdi-pencil-outline
    </v-icon>
  </div>
</template>

<script>
export default {
  name: 'FE-EditToggle',
  methods: {
    toggleEdit() {
      this.editMode = !this.editMode;
      this.$emit('updateeditmode', this.editMode);
    },
  },
  data() {
    return {
      editMode: false,
    };
  },
};
</script>
