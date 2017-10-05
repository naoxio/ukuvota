<template>
  <q-layout ref="layout" view="hHh Lpr fff">
    <MainMenu slot="header" />
    <div class="layout-view">
      <div class="layout-padding">
        </br>
        <slot />
      </div>
    </div>
  </q-layout>
</template>

<script>
  import LangSwitcher from '@/LangSwitcher'
  import MainMenu from '@/MainMenu'
  import { LocalStorage, uid, QLayout } from 'quasar'
  
  export default {
    name: 'index',
    components: {
      LangSwitcher,
      MainMenu,
      QLayout
    },
    data () {
      return {}
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
</style>
