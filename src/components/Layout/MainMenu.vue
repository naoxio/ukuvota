<template>
  <div class="nav row">
    <q-btn @click="goTo('home')" color="primary" flat>
      <img src="statics/icons/home.png" />
      <q-tooltip delay="100">
        {{ $t('Home') }}
      </q-tooltip>
    </q-btn>
    <q-btn @click="goTo('manual')" color="primary" flat>
      <q-icon name="book" />
      <q-tooltip delay="100">
        {{ $t('Manual') }}
      </q-tooltip>
    </q-btn>
    <q-btn @click="launch('https://gitlab.com/yunity/ukuvota/')" color="primary" flat>
      <q-icon name="code" />
      <q-tooltip delay="100">
        {{ $t('Code') }}
      </q-tooltip>
    </q-btn>
    <q-btn @click="launch('https://gitter.im/ukuvota/Lobby')" color="primary" flat>
      <q-icon name="chat" />
      <q-tooltip delay="100">
        {{ $t('Chat') }}
      </q-tooltip>
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

  import { openURL, QBtn, QIcon, QTooltip } from 'quasar'
  
  export default {
    name: 'index',
    components: {
      LangSwitcher,
      SettingsModal,
      QBtn,
      QIcon,
      QTooltip
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
  
  .q-tooltip
    margin-top 0.3em
</style>
