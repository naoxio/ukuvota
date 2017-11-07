<template>
  <q-select type="list" v-model="locale" :options="langOptions"/>
</template>

<script>
  import { LocalStorage, QSelect } from 'quasar'
  import i18n from 'src/i18n'

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
        LocalStorage.set('locale', val)
      }
    }
  }
</script>
<style lang="stylus" scoped>

.q-if::before
  display none
.q-if::after
  display none
</style>
