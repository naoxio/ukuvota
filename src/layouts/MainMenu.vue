<template>
  <div class="nav row">
    <UBtn :imgStyle="imgStyle" route="home" img="statics/icons/logo.svg" :tooltipDelay="100" :tooltip="$t('Home')"/>
    <UBtn route="manual" icon="book" :tooltipDelay="100" :tooltip="$t('Manual')" />
    <UBtn launch="https://gitlab.com/yunity/ukuvota/" icon="code" :tooltipDelay="100" :tooltip="$t('Code')" />
    <UBtn launch="https://gitter.im/ukuvota/Lobby/" icon="chat" :tooltipDelay="100" :tooltip="$t('Chat')" />
    <div class="col">
    </div>
    <div class="col-auto">
    </div>
    <SettingsModal/>
  </div>
</template>

<script>
  import LangSwitcher from '@/selectors/Language'
  import SettingsModal from '@/modals/Settings'
  import UBtn from '@/general/UBtn'
  
  export default {
    name: 'index',
    components: {
      LangSwitcher,
      SettingsModal,
      UBtn
    },
    computed: {
      imgStyle () {
        return 'width: ' + this.imgWidth() + 'px'
      }
    },
    methods: {
      imgWidth () {
        let width = (window.innerWidth > 0) ? window.innerWidth : screen.width
        let value = 36
        if (width > 400) value = 48
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
    background-color white
</style>
