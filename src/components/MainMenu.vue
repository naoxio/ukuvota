<template>
  <div class="nav row">
    <q-btn @click="goTo('home')" color="primary" flat>
      <img src="statics/icons/home.png" />
    </q-btn>
    <q-btn @click="goTo('manual')" color="primary" flat>
      <img src="statics/icons/book.png" />
    </q-btn>
    <q-btn @click="launch('https://gitlab.com/ukuvota/ukuvota/')" color="primary" flat>
      <img src="statics/icons/gitlab.png" />
    </q-btn>
    <q-btn @click="launch('https://gitter.im/ukuvota/Lobby')" color="primary" flat>
      <img src="statics/icons/gitter.png" />
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
      goTo (name) {
        this.$router.push({name: name})
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
  @media screen and (max-width: 400px)
    .nav
      img
       height 16px
  @media screen and (min-width: 400px)
   .nav
     img
      height 28px
  
  .nav
    width 100%
    background-color white

  .lang
    margin-left 1em
</style>
