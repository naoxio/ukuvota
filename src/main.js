// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
import * as firebase from 'firebase'

Vue.config.productionTip = false
Vue.use(Quasar) // Install Quasar Framework

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    render: h => h(require('./App'))
  })

  initDb()
})

function initDb () {
  // Initialize Firebase
  var config = {
    apiKey: 'AIzaSyB7KCC4PEbn1gk4NrdFlrARGmcYK7C1SnY',
    authDomain: 'ukuvota.firebaseapp.com',
    databaseURL: 'https://ukuvota.firebaseio.com',
    projectId: 'ukuvota',
    storageBucket: 'ukuvota.appspot.com'
    // messagingSenderId: '105902830879"
  }
  firebase.initializeApp(config)
  // write
  firebase.database().ref('settings/' + 'default').set({
    message: 'Ukuvota now on Firebase',
    email: 'info@ukuvota.de'
  })
  // read
  var userRef = firebase.database().ref('settings/default')
  userRef.on('value', function (someValue) {
    console.log(someValue.val().message)
  })
}
