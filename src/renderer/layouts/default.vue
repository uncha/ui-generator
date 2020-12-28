<template>
  <div>
    <app-header />
    <div class="contents">
      <nuxt />
    </div>
  </div>
</template>

<script>
import appHeader from '@/components/header'
import $ from 'jquery'
export default {
  components: { appHeader },
  mounted () {
    window.$ = $
  }
}
</script>

<style lang="scss">
@import 'bootstrap/scss/bootstrap.scss';
@import 'bootstrap-vue/src/index.scss';

a {
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
}

.contents {
  padding:20px;
}
</style>
