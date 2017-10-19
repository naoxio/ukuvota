<template>
  <div class="nav row">
    <q-btn @click="goTo('home')" color="primary" flat>
      <img src="statics/icons/home.png" />
    </q-btn>
    <q-btn @click="goTo('manual')" color="primary" flat>
      <q-icon name="book" />
    </q-btn>
    <q-btn @click="launch('https://gitlab.com/ukuvota/ukuvota/')" color="primary" flat>
      <q-icon name="code" />
    </q-btn>
    <q-btn @click="launch('https://gitter.im/ukuvota/Lobby')" color="primary" flat>
      <q-icon name="chat" />
    </q-btn>
    <div class="col">
    </div>
    <div class="col-auto">
    </div>
    <SettingsModal/>
  </div>
</template>

<script>
  import LangSwitcher from '@/Select/Language'
  import SettingsModal from '@/Modal/Settings'

  import { openURL, QBtn, QIcon } from 'quasar'
  
  export default {
    name: 'index',
    components: {
      LangSwitcher,
      SettingsModal,
      QBtn,
      QIcon
    },
    methods: {
      launch (url) {
        openURL(url)
      },
      openSettings () {
        console.log(this.$refs)
        this.$refs.settings.open()
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
       height 22px
  
  @media screen and (min-width: 400px)
    .nav
      img
        height 28px
  
  .nav
    width 100%
</style>
