import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VJsoneditor from 'v-jsoneditor'
import $ from 'jquery'
import axios from 'axios'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VJsoneditor)

Vue.prototype.axios = axios
