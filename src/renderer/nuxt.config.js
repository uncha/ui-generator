/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */

module.exports = {
  mode: 'spa', // or 'universal'
  head: {
    title: 'ui-generator',
    meta: [{ charset: 'utf-8' }]
  },
  loading: false,
  plugins: ['~plugins/GlobalComponents.js'],
  buildModules: [

  ],
  modules: [
    '@nuxtjs/axios'
  ]
}
