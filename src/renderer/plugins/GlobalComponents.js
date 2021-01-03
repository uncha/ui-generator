import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VJsoneditor from 'v-jsoneditor'
import $ from 'jquery'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VJsoneditor)
Vue.use(moment)

Vue.prototype.axios = axios
