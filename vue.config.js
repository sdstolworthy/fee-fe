module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  pluginOptions: {
    apollo: {
      lintGQL: true,
      enableMocks: true,
      enableEnging: true,
    },
  },
};
