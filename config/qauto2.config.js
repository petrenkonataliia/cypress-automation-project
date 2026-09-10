const { defineConfig } = require('cypress');
const baseConfig = require('../cypress.config');

module.exports = defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    baseUrl: 'https://guest:welcome2qauto@qauto2.forstudy.space',
    env: {
      userEmail: 'test.email9876@mail.com',
      userPassword: '178YGfe45@33',
    },
  },
});