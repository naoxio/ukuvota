<template>
  <q-checkbox v-model="selectedVoters" :val="name" :label="name"/>
</template>

<script>
  import { QCheckbox } from 'quasar'
  import { mapState, mapActions } from 'vuex'

  export default {
    components: {
      QCheckbox
    },
    props: {
      name: { required: true }
    },
    computed: {
      ...mapState([
        'votes'
      ])
    },
    methods: {
      ...mapActions([
        'updSelectedVoters'
      ])
    },
    mounted () {
      if (this.selectedVoters === undefined) this.updateSelected(Object.keys(this.votes))
    },
    watch: {
      selectedVoters (val) {
        this.$store.dispatch('updSelectedVoters', val)
      }
    },
    data () {
      return {
        ...mapState([
          'selectedVoters'
        ]),
        selectedVoters: this.$store.state.selectedVoters
      }
    }
  }
</script>

<style lang="stylus">

</style>
