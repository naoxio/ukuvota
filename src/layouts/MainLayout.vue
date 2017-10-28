<template>
  <q-layout :class="theme" ref="layout" view="hHh Lpr fff">
    <MainMenu slot="header" />
    <div class="layout-view">
      <div class="layout-padding">
        </br>
        <center>
          <slot />
        </center>
      </div>
    </div>
  </q-layout>
</template>

<script>
  import LangSwitcher from '@/Select/Language'
  import MainMenu from '@/Layout/MainMenu'
  import { LocalStorage, uid, QLayout } from 'quasar'
  import { mapState } from 'vuex'

  export default {
    name: 'index',
    components: {
      LangSwitcher,
      MainMenu,
      QLayout
    },
    computed: {
      ...mapState([
        'theme'
      ])
    },
    mounted () {
      let sessionID = LocalStorage.get.item('SessionID')
      if (sessionID === null) {
        sessionID = uid()
        LocalStorage.set('SessionID', sessionID)
      }
    }
  }
</script>

<style lang="stylus">
  body
    font-family 'coolFont'
  
  .q-tab-pane
    border none
  
  .q-tabs-bar
    border none
  
  .light
    color black
    background-color white
    .layout-header 
      background-color white

  .purple
    .layout-header 
      background-color white
    *
      color purple

</style>
