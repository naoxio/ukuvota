<template>
  <process-layout>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <div v-if="noResults">
          <p class="caption">{{ $t('Results.noResults') }} :(</p>
        </div>
        <div v-else>
          <div class="row justify-between">
            <p class="caption">{{ $t('Results.title') }}!</p>
            <q-checkbox v-model="highlightTopScores" :label="$t('HighlightTopScores')" />
          </div>
        </div>
        <div v-if="noResults">
          <q-item>
            <q-item-main style="text-align: center">
              <router-link :to="{ name: 'create' }">
                <img id="noresults" src="statics/noresults.svg"></img>
              </router-link>
              <p style="font-size: 50px">{{ $t('Results.noOneVoted') }}</p>
                <router-link :to="{ name: 'create' }">
                  <p style="font-size: 30px">{{ $t('Results.tryAgain') }}</p>
                </router-link>
            </q-item-main>
          </q-item>
        </div>
        <div v-for="(value, proposal) in sortedResults" :key="value">
          <q-item :class="{ topProposal: getEmoji(proposal) === 3, highlightTopScores: highlightTopScores && getEmoji(proposal) === 3}">
            <q-item-main :label="proposal" :sublabel="getDescription(proposal)"></q-item-main>
            <q-item-side>
              <img :src="'statics/emo/' + getEmoji(proposal) + '.svg'" height="32px" />
            </q-item-side>
          </q-item>
        </div>
      </q-card-main>
    </q-card>
    <q-card v-if="noResults === false" style="max-width: 700px; text-align: left;">
     <q-card-main>
        <div class="row justify-between">
          <p> {{ $t('Results.disclaimer')}} </p>
          <div
            <DataTable :proposals="proposals" :votes="votes" :results="results" :negativeScore="negativeScore" />
          </div>
        </div>
     </q-card-main>
   </q-card>
  </process-layout>
</template>
<script>
import ProcessLayout from 'layouts/ProcessLayout'
import { QBtn, QCard, QCardMain, QCheckbox, QField, QItem, QItemMain, QItemSide, QList } from 'quasar'
import { getTopic } from 'src/data'
import DataTable from '@/DataTable'

export default {
  components: {
    ProcessLayout,
    DataTable,
    QBtn,
    QCard,
    QCardMain,
    QCheckbox,
    QField,
    QItem,
    QItemMain,
    QItemSide,
    QList
  },
  mounted () {
    this.id = this.$route.params.id
    getTopic(this.id).then((topic) => {
      this.votes = topic.votes
      this.proposals = topic.proposals
      if (topic.negativeScoreWeight === 'infinity') this.negativeScore = 1
      else this.negativeScore = topic.negativeScoreWeight
      this.orderList()
    })
  },
  methods: {
    goToResultsRaw () {
      this.$router.push({ name: 'results-raw', params: { id: this.id } })
    },
    orderList () {
      this.results = {}
      for (let name in this.votes) {
        this.genResults(name)
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
        console.log(this.sortedResults)
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
    getPercentage (proposal) {
      let score = this.getScore(proposal)
      return score / this.max
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
      results: {},
      votes: {},
      sortedResults: {},
      percentages: {},
      proposals: {},
      total: 0,
      negativeScore: 3,
      noResults: false,
      highlightTopScores: false
    }
  }
}
</script>
<style lang="stylus">
.topProposal
  font-weight bold

.highlightTopScores
  font-size 20px
  border-radius 30px
  background-color #ffffcc 

.red
  background-color #FFEBEE

.yellow
  background-color #ffffcc

table
  td
    height 64px
  th
    height 64px

@keyframes blink {
  50% {
    opacity 0.6
    transform:rotate(20deg)
  }
}

#noresults
  animation spin 10s linear infinite
  animation blink 1s step-start 0s infinite
</style>
