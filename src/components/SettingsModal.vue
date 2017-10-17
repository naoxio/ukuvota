<template>
  <div class="row">
    <lang-switcher class="lang"/>
    <q-btn color="primary" @click="$refs.settings.open()" flat>
      <q-icon name="settings" />
      <q-modal ref="settings" :content-css="{padding: '50px', maxWidth: '700px'}">
        <h5>{{ $t('GlobalSettings') }}</h5>
        <div>
          <div :class="row()">{{ $t('Language') }} <lang-switcher /></div>
          <div :class="row()"> asdf<lang-switcher /></div>
        </div>

        <p class="caption">{{ $t('LocalSave') }}</p>
        <center>
          <q-btn color="primary" @click="$refs.settings.close()">{{ $t('Close') }}</q-btn>
        </center>
      </q-modal>
    </q-btn>
  </div>
</div>
</template>
<script>
  import { QBtn, QModal, QIcon } from 'quasar'
  import LangSwitcher from '@/LangSwitcher'
  export default {
    components: {
      LangSwitcher,
      QBtn,
      QModal,
      QIcon
    },
    methods: {
      row () {
        return 'row justify-between items-center'
      }
    },
    data () {
      return {
        urlpath: window.location.href,
        logopath: 'statics/logo.png'
      }
    }
  }
</script>
<style lang="stylus" scoped>  
  @media screen and (max-width: 400px)
    .lang
      display none

    
</style>
