const { defineConfig } = require('cypress');
const baseConfig = require('../cypress.config');

module.exports = defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space',
    env: {
      userEmail: 'emily.willson.test@mail.com',
      userPassword: '12587oiuU#f',
    },
  },
});