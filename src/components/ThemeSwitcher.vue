<template>
  <q-select type="list" v-model="theme" :options="options"/>
</template>

<script>
  import { LocalStorage, QSelect } from 'quasar'
  import i18n from '../i18n'
  export default {
    components: { QSelect },
    data () {
      return {
        options: [
          { value: 'light', label: 'light' },
          { value: 'dark', label: 'dark' }
        ]
      }
    },
    watch: {
      theme (val) {
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
