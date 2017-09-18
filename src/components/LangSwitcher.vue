<template>
  <q-select inverted type="list" v-model="locale" :options="langOptions"></q-select>
</template>

<script>
  import { QSelect } from 'quasar'
  import i18n from '../i18n'
  export default {
    components: { QSelect },
    data () {
      return {
        locale: i18n.locale,
        langOptions: [
          { value: 'de', label: 'de' },
          { value: 'en', label: 'en' }
        ]
      }
    },
    watch: {
      locale (val) {
        i18n.locale = val
      }
    }
  }
</script>

<style lang="stylus">
  .q-select
    font-size 1em
    min-height 1em
    min-width 2em
</style>
