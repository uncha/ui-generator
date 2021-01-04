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
import _ from 'lodash'
import moment from 'moment'
export default {
  components: { appHeader },
  mounted () {
    window.$ = $
    window._ = _
    window.moment = moment
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
