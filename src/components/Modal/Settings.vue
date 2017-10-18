<template>
  <div class="row">
    <Language class="lang"/>
    <!--q-btn color="primary" @click="$refs.settings.open()" flat>
      <q-icon name="settings" />
      <q-modal ref="settings" :content-css="{padding: '50px', maxWidth: '700px'}">
        <Global :rowStyle="row()"/>
        <div v-if="isRoute('results')"><Results /></div>
        <p class="caption">{{ $t('LocalSave') }}</p>
        <center>
          <q-btn color="primary" @click="$refs.settings.close()">{{ $t('Close') }}</q-btn>
        </center>
      </q-modal>
    </q-btn-->
  </div>
</div>
</template>
<script>
  import { QBtn, QModal, QIcon } from 'quasar'
  import Language from '@/Select/Language'
  import Global from '@/Setting/Global'
  import Results from '@/Setting/Results'

  export default {
    components: {
      Language,
      Global,
      Results,
      QBtn,
      QModal,
      QIcon
    },
    methods: {
      row () {
        return 'row justify-between items-center'
      },
      isRoute (name) {
        console.log(this.route, name)
        if (name === this.route) return true
        else return false
      }
    },
    data () {
      return {
        urlpath: window.location.href,
        logopath: 'statics/logo.png',
        route: this.$route.name
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
