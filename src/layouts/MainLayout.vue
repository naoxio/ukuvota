<template>
  <q-layout ref="layout" view="lHh Lpr fff">
    <div class="layout-view">
      <div class="layout-padding">
        <center>
          <MainMenu />
          <br/>
          <slot />
        </center>
      </div>
    </div>
  </q-layout>
</template>

<script>
  import LangSwitcher from '@/LangSwitcher'
  import MainMenu from '@/Menu'
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
