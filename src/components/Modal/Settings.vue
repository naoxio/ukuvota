<template>
  <div class="row">
    <Language class="lang"/>
    <q-btn color="primary" @click="$refs.settings.open()" flat>
      <q-icon name="settings" />
      <q-modal ref="settings" :content-css="{padding: '50px', maxWidth: '700px'}">
        <h5>{{ $t('GlobalSettings') }}</h5>
        <div>
          <div :class="row()">{{ $t('Language') }} <Language /></div>
          <div :class="row()">{{ $t('Theme') }} <Theme /> </div>
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
  import Language from '@/Select/Language'
  import Theme from '@/Select/Theme'

  export default {
    components: {
      Language,
      Theme,
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

  .caption
    color grey
</style>
