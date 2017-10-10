<template>
  <q-checkbox v-model="selection" :val="name" :label="name"/>
</template>

<script>
import {
  QCheckbox
} from 'quasar'

export default {
  props: {
    name: { required: true },
    votes: { required: true },
    proposals: { required: true }
  },
  components: {
    QCheckbox
  },
  methods: {
    genResults (name) {
      for (let proposal in this.proposals) {
        let vote = this.votes[name][proposal]
        if (vote < 0) vote = vote * this.negativeScore
        if (this.res[proposal] === undefined) {
          this.res[proposal] = vote
        }
        else {
          this.res[proposal] = this.res[proposal] + vote
        }
      }
    }
  },
  mounted () {
    this.res = {}
    console.log(Object.keys(this.votes))
    for (let x = 0; x < this.selection.length; x++) {
      this.genResults(this.selection[x])
    }
  },
  watch: {
    selection (newVal) {
      this.res = {}
      for (let x = 0; x < newVal.length; x++) {
        this.genResults(newVal[x])
      }
    }
  },
  data () {
    return {
      selection: Object.keys(this.votes),
      res: {}
    }
  }
}
</script>

<style lang="stylus">

</style>
