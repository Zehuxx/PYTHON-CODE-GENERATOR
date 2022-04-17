const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy:{
        '/v1': {
            target: 'https://api.jdoodle.com/'
          },
          '/v2': {
            target: 'http://localhost:3000/'
          }
    }
}  
})

