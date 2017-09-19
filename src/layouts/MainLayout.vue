<template>
  <q-layout ref="layout" view="lHh Lpr fff">
    <div class="layout-view">
      <div class="layout-padding">
        <center>
          <Menu></Menu>
          <br></br>
          <slot></slot>
        </center>
      </div>
    </div>
    <div slot="footer">
      <slot name="app-footer"></slot>
    </div>
  </q-layout>
</template>

<script>
  import LangSwitcher from '@/LangSwitcher'
  import Menu from '@/Menu'
  import {
    QLayout
  } from 'quasar'
  
  export default {
    name: 'index',
    components: {
      LangSwitcher,
      Menu,
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
