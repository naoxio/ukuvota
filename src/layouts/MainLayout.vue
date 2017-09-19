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
  import {
    QLayout
  } from 'quasar'
  
  export default {
    name: 'index',
    components: {
      LangSwitcher,
      MainMenu,
      QLayout
    },
    data () {
      return {}
    }
  }
</script>

<style lang="stylus">
body
  font-family 'coolFont'
</style>
