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
                  {{ $t('Total') }}: {{ getScore(id) }}
                </div>
              </q-tooltip>
              <UEmoji :class="{ pointer: !resHover.none }" :id="getEmoji(id)"/>
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
  import UEmoji from '@/General/UEmoji'
  import NameList from '@/List/Names'
  import { mapState, mapGetters } from 'vuex'

  export default {
    components: {
      QCheckbox,
      QTooltip,
      ULabel,
      NameList,
      UEmoji
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
        console.log(val.length)
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
        this.results = {}
        for (let x = 0; x < this.selectedVoters.length; x++) {
          this.genResults(this.selectedVoters[x])
        }
        if (Object.keys(this.results).length !== 0) {
          // calculate the highest score
          this.genMax(this.results)
          // create an ordered lists with the highest score on top
          let myObj = this.results
          this.sortedResults = {}
          this.sortedResults = Object.keys(myObj).sort((a, b) => myObj[b] - myObj[a]).reduce((_sortedObj, key) => ({
            ..._sortedObj,
            [key]: myObj[key]
          }), {})
        }
        else {
          this.noResults = true
        }
      },
      genResults (name) {
        for (let proposal in this.proposals) {
          let vote = this.votes[name][proposal]
          if (vote < 0) vote = vote * this.negativeScore
          if (this.results[proposal] === undefined) {
            this.results[proposal] = vote
          }
          else {
            this.results[proposal] = this.results[proposal] + vote
          }
        }
      },
      genMax (object) {
        this.max = -999999999
        for (let key in object) {
          if (this.max < object[key]) this.max = object[key]
        }
      },
      getScore (proposal) {
        return this.results[proposal]
      },
      getAvgScore (proposal) {
        return this.results[proposal] / this.selectedVoters.length
      },
      getAvgRoundedScore (id) {
        return Math.round((this.getAvgScore(id)) * 100) / 100
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
