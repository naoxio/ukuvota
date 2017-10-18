<template>
  <div>
    <div class="row justify-between">
      <p class="caption">{{ $t('Results.title') }}!</p>
    </div>
    <div v-for="(value, id) in results" :key="value">
      <div :class="{ topProposal: getEmoji(id) === 3, highlightTopScores: highlightTopScores && getEmoji(id) === 3}">
        <div class="list row justify-between items-center">
          <div>
            <ULabel :hyperlink="true" :value="getTitle(id)" />
            <ULabel class="sublabel" :hyperlink="true" :value="getDescription(id)" />
          </div>
          <img :src="'statics/emo/' + getEmoji(id) + '.svg'" height="32px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QCheckbox, QItem, QItemMain, QItemSide } from 'quasar'
import ULabel from '@/General/ULabel'

export default {
  props: {
    results: { required: false },
    votes: { required: true },
    proposals: { required: true },
    max: { required: true }
  },
  components: {
    QCheckbox,
    QItem,
    QItemMain,
    QItemSide,
    ULabel
  },
  mounted () {
    console.log(Object.keys(this.votes))
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
    getDescription (id) {
      return this.proposals[id].description
    },
    getTitle (id) {
      return this.proposals[id].title
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
      selection: this.options,
      highlightTopScores: false
    }
  }
}
</script>

<style lang="stylus" scoped>
  .list
    padding 0.5em

  .sublabel
    color grey 

  .topProposal
    font-weight bold

  .highlightTopScores
    background-color #ffffcc 
</style>
