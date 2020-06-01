module.exports = {
  client: {
    service: {
      name: 'fee-fe',
      // URL to the GraphQL API
      url: 'http://opl-content-api-fe-enablement-dev.apps.s44.core.rht-labs.com/graphql',
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
    ],
  },
};
