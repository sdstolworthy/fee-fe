// src/mixins/clickMixin.js
export default {
  methods: {
    getTagColor(tag) {
      switch (tag) {
        case '100':
          return '#259186';
        case '200':
          return '#2077C7';
        case '300':
          return '#B65585';
        case '400':
          return '#8B5E00';
        case '500':
          return '#918625';
        case 'HTML':
          return '#256691';
        case 'CSS':
          return '#912530';
        default:
          return '#EE0200';
      }
    },
  },
};
