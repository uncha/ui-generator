<template>
  <div>
    V 0.0.1
  </div>
</template>

<script>
import { remote } from 'electron'

export default {
  data () {
    return {
      externalContent: ''
    }
  },
  mounted () {

  },
  methods: {
    openURL (url) {
      remote.shell.openExternal(url)
    }
  }
}
</script>

<style>

</style>
