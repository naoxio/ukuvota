<template>
  <div class="nav row">
      <q-btn class="imgbtn" @click="goHome" color="primary" flat>
        <img src="statics/logo.png" width="48px" />
      </q-btn>
      <q-btn @click="launch('https://douginamug.gitbooks.io/cooperative-decision-making-that-scales/content/')" color="primary" flat>
        <q-icon name="book" />
      </q-btn>
      <q-btn @click="launch('https://gitlab.com/ukuvota/ukuvota/')" color="primary" flat>
        <q-icon name="fa-gitlab"/>
      </q-btn>
      <q-btn class="imgbtn" @click="launch('https://gitter.im/ukuvota/Lobby')" color="primary" flat>
        <img src="statics/icons/gitter.png" width="48px" />
      </q-btn>
      <div class="col">
      </div>
      <div class="col-auto">
        <lang-switcher class="lang"/>
      </div>
  </div>
</template>

<script>
  import LangSwitcher from '@/LangSwitcher'

  import { openURL, QBtn, QIcon } from 'quasar'
  
  export default {
    name: 'index',
    components: {
      LangSwitcher,
      QBtn,
      QIcon
    },
    methods: {
      launch (url) {
        openURL(url)
      },
      goHome () {
        this.$router.push({name: 'home'})
      }
    },
    data () {
      return {
        rotating: false
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .imgbtn
    padding 0 0.5em 0 0.5em

  .nav
    width 100%
    background-color white

  .lang
    margin-left 1em
</style>
