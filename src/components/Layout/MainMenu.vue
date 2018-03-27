<template>
  <div class="nav row">
    <u-btn :imgStyle="imgStyle()" launch="https://ukuvota.world" img="statics/icons/home.png" :tooltipDelay="100" :tooltip="$t('Home')"/>
    <u-btn launch="https://ukuvota.world/docs" icon="book" :tooltipDelay="100" :tooltip="$t('Manual')" />
    <u-btn launch="https://git.ukuvota.world/ukuvota" icon="code" :tooltipDelay="100" :tooltip="$t('Code')" />
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
  import UBtn from '@/General/UBtn'
  
  export default {
    name: 'index',
    components: {
      LangSwitcher,
      SettingsModal,
      UBtn
    },
    methods: {
      imgStyle () {
        return 'width: ' + this.imgWidth() + 'px'
      },
      imgWidth () {
        let width = (window.innerWidth > 0) ? window.innerWidth : screen.width
        let value = 22
        if (width > 400) value = 28
        return value
      },
      openSettings () {
        this.$refs.settings.open()
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
  .nav
    width 100%
</style>
