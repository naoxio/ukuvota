<template>
  <q-select type="list" v-model="theme" :options="options"/>
</template>

<script>
  import { LocalStorage, QSelect } from 'quasar'
  import { mapActions, mapState } from 'vuex'
  export default {
    components: { QSelect },
    methods: {
      ...mapActions([
        'updateTheme'
      ])
    },
    data () {
      return {
        options: [
            { value: 'light', label: 'light' },
            { value: 'purple', label: 'purple' }
        ],
        ...mapState([
          'theme'
        ]),
        theme: this.$store.state.theme
      }
    },
    watch: {
      theme (val) {
        this.$store.dispatch('updateTheme', val)
        LocalStorage.set('theme', val)
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
