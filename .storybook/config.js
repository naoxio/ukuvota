// Vue config (from main.js)

// default to material design
import '../src/themes/app.mat.styl'

import Vue from 'vue'
import Quasar from 'quasar'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'

Vue.config.productionTip = false
Vue.use(Quasar) // Install Quasar Framework
Vue.use(Vuex) // Install Vuex
Vue.use(VueI18n)

import 'quasar-extras/roboto-font'
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
import 'quasar-extras/fontawesome'
import 'quasar-extras/animate'

// Storybook config
import { configure } from '@storybook/vue'

const req = require.context("../src", true, /\.story\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module)
