<template>
  <div>
    <p class="caption">{{ $t('Names.voted') }}</p>
    <NameList :votes="votes" :select="false" />
    </br>
    <div class="row justify-between">
      <p class="caption">{{ $t('Results.title') }}!</p>
      <q-checkbox v-model="highlightTopScores" :label="$t('HighlightTopScores')" />
    </div>
    <div style="list" v-for="(value, id) in results" :key="value">
      <div :class="{ topProposal: getTotalEmoji(id) === 3, highlightTopScores: highlightTopScores && getTotalEmoji(id) === 3}">
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
import NameList from '@/List/Names'

export default {
  props: {
    results: { required: false },
    votes: { required: true },
    proposals: { required: true },
    max: { required: true },
    negativeScore: { required: true }
  },
  components: {
    QCheckbox,
    QItem,
    QItemMain,
    QItemSide,
    ULabel,
    NameList
  },
  methods: {
    getScore (proposal) {
      return this.results[proposal]
    },
    getAvgScore (proposal) {
      return this.results[proposal] / this.getLength(this.votes)
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
    getAvgEmoji (id) {
      let emo = Math.round(this.getAvgScore(id))
      if (emo < 0) {
        emo = Math.round(emo / this.negativeScore)
      }
      return emo
    },
    getTotalEmoji (proposal) {
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
    },
    getEmoji (proposal) {
      if (this.getAverage) {
        return this.getAvgEmoji(proposal)
      }
      else return this.getTotalEmoji(proposal)
    }
  },
  data () {
    return {
      selection: this.options,
      highlightTopScores: false,
      getAverage: true
    }
  }
}
</script>

<style lang="stylus" scoped>
  .caption
    text-align left 
    font-size 1.2em

  .list
    padding 0.5em
    text-align left 
  
  .sublabel
    color grey 

  .topProposal
    font-weight bold

  .highlightTopScores
    background-color #ffffcc 
</style>
