const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack:{
    resolve:{
      alias:{
        'vee-valisate$': 'vee-validate/dist/vee-validate.minimal.esm.js',
      },
    },
    performance:{
      hints: false,
    },
    optimization: {
      splitChunks:{
        minSize: 100000,
        maxSize: 2000000,
      },
    },
  }
})
