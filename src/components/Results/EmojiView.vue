<template>
  <div>
    <p class="caption">{{ $t('Names.voted') }}</p>
    <NameList />
    </br>
    <div class="row justify-between">
      <p class="caption">{{ $t('Results.title') }}!</p>
      <q-checkbox v-model="highlightTopScores" :label="$t('HighlightTopScores')" />
    </div>
    <div>
      <div class="list" v-for="(value, id) in results" :key="value">
        <div :class="{ topProposal: getTotalEmoji(id) === 3, highlightTopScores: highlightTopScores && getTotalEmoji(id) === 3}">
          <div class="list row justify-between items-center">
            <div class="col">
              <ULabel :hyperlink="true" :value="getTitle(id)" />
              <ULabel class="sublabel" :hyperlink="true" :value="getDescription(id)" />
            </div>
            <div class="col-auto">
              <q-tooltip v-if="!resHover.none">
                <div v-if="resHover.avg">
                  {{ $t('Average') }}: {{ getAvgRoundedScore(id) }}
                </div>
                <div v-if="resHover.total">
                  {{ $t('Total') }}: {{ getTotalScore(id) }}
                </div>
              </q-tooltip>
              <img :class="{ pointer: !resHover.none }" :src="'statics/emo/' + getEmoji(id) + '.svg'" height="32px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { QCheckbox, QTooltip } from 'quasar'
  import ULabel from '@/General/ULabel'
  import NameList from '@/List/Names'
  import { mapState, mapGetters } from 'vuex'
  import { getOrderedList, getAvgScore, getAvgRoundedScore, getTotalScore, getIndiScore } from 'src/results'

  export default {
    components: {
      QCheckbox,
      QTooltip,
      ULabel,
      NameList
    },
    computed: {
      ...mapState([
        'proposals',
        'negativeScoreWeight',
        'votes',
        'resHover'
      ]),
      ...mapGetters({
        selectedVoters: 'getSelectedVoters'
      })
    },
    watch: {
      selectedVoters (val) {
        if (val.length > 0) {
          this.orderList()
        }
      }
    },
    mounted () {
      if (this.selectedVoters.length > 0) this.orderList()
      if (this.negativeScore === 'infinity') this.negativeScore = 1
      else this.negativeScore = this.negativeScore
    },
    methods: {
      orderList () {
        let list = getOrderedList(this.selectedVoters, this.proposals, this.votes, this.negativeScoreWeight)
        if (list === -1) this.noResults = true
        else this.sortedResults = list
      },
      getAvgScore (id) { return getAvgScore(id, this.results, this.selectedVoters) },
      getTotalScore (id) { return getTotalScore(id, this.results) },
      getIndiScore (object, proposal) { return getIndiScore(object, proposal, this.negativeScoreWeight) },
      getAvgRoundedScore (id) { return getAvgRoundedScore(id, this.res, this.selectedVoters) },
      getDescription (id) { return this.proposals[id].description },
      getTitle (id) { return this.proposals[id].title },
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
        highlightTopScores: false,
        getAverage: true,
        results: {},
        sortedResults: {},
        percentages: {},
        total: 0,
        negativeScore: 3
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .pointer 
    cursor pointer

  .caption
    text-align left 
    font-size 1.2em

  .list
    text-align left 
    padding 0.2em
  
  .sublabel
    color grey 

  .topProposal
    font-weight bold

  .highlightTopScores
    background-color #ffffcc 
    margin -0.5em
    padding 0.5em
</style>
