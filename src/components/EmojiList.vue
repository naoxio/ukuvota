<template>
  <div>
    <div v-for="(value, proposal) in results" :key="value">
      <q-item :class="{ topProposal: getEmoji(proposal) === 3, highlightTopScores: highlightTopScores && getEmoji(proposal) === 3}">
        <q-item-main :label="proposal" :sublabel="getDescription(proposal)"></q-item-main>
          <q-item-side>
            <img :src="'statics/emo/' + getEmoji(proposal) + '.svg'" height="32px" />
          </q-item-side>
        </q-item-main>
     </q-item>
    </div>
  </div>
</template>

<script>
import { QItem, QItemMain, QItemSide } from 'quasar'

export default {
  props: {
    results: { required: true },
    votes: { required: true },
    proposals: { required: true },
    max: { required: true }
  },
  components: {
    QItem,
    QItemMain,
    QItemSide
  },
  methods: {
    getPercentage (proposal) {
      let score = this.getScore(proposal)
      return score / this.max
    },
    getScore (proposal) {
      return this.results[proposal]
    },
    getLength (object) {
      return Object.keys(object).length
    },
    getDescription (proposal) {
      return this.proposals[proposal]
    },
    getEmoji (proposal) {
      let length = this.getLength(this.votes)
      let multiplier = this.negativeScore - 1
      let p = this.getScore(proposal)
      let emo = 0
      if (p === this.max) emo = 3
      else if (p >= this.max - length) emo = 2
      else if (p >= this.max - length * 2) emo = 1
      else if (p >= this.max - length * 3) emo = 0
      else if (p >= this.max - length * 4 * multiplier) emo = -1
      else if (p >= this.max - length * 5 * multiplier) emo = -2
      else emo = -3
      return emo
    }
  },
  data () {
    return {
      selection: this.options
    }
  }
}
</script>

<style lang="stylus">

</style>
