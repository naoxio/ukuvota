<template>
  <process-layout>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <div v-if="noResults">
          <p class="caption">No Results :(</p>
        </div>
        <div v-else>
          <div class="row justify-between">
            <p class="caption">Results!</p>
            <q-checkbox v-model="highlightTopScores" label="Highlight Top Scores" />
          </div>
        </div>
        <div v-if="noResults">
          <q-item>
            <q-item-main style="text-align: center">
              <router-link :to="{ name: 'home' }">
                <img id="noresults" src="statics/noresults.svg"></img>
              </router-link>
              <p style="font-size: 50px">no one voted</p>
                <router-link :to="{ name: 'home' }">
                  <p style="font-size: 30px">try again, this time tell your friends!</p>
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
       <p class="caption">Raw Data Table</p>
       <table class="q-table horizontal-seperator loose flipped vertical-separator">
         <thead>
           <tr>
             <th class="text-left red">Name</th>
             <div v-for="(description, proposal) in proposals" :key="proposal">
               <th class="red" style="max-width: 150px; overflow-wrap: break-word;">{{ proposal }}</th>
             </div> 
           </tr>
         </thead>
         <tbody>
           <div v-for="(object, name, index) in votes" :key="name">
             <tr>
               <td class="red" style="font-weight: bold" data-th="Name">{{ name }}</td>
               <div v-for="(description, proposal) in proposals" :key="proposal">
                 <td :data-th="proposal" class="text-center"> {{ getIndiScore(object, proposal) }}</td>
               </div> 
             </tr>
            </div>
         </tbody>
         <tfood>
           <tr class="text-right">
              <th class="red">Total</th>
              <div v-for="(description, proposal) in proposals" :key="proposal">
                <td :data-th="proposal" class="text-center yellow"> {{ getScore(proposal) }}</td>
              </div>
           </tr>
         </tfood>
       </table>
     </q-card-main>
   </q-card>
  </process-layout>
</template>
<script>
import ProcessLayout from '@/layouts/ProcessLayout'
import { QBtn, QCard, QCardMain, QCheckbox, QField, QItem, QItemMain, QItemSide, QList } from 'quasar'
import { getTopic } from '@/data.js'

export default {
  components: {
    ProcessLayout,
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
    let tmp = this
    getTopic(this.id).then(this.getData).then(function () {
      tmp.results = {}
      for (let name in tmp.votes) {
        tmp.genResults(name)
      }
      if (Object.keys(tmp.results).length !== 0) {
        // calculate the highest score
        tmp.genMax(tmp.results)
        // create an ordered lists with the highest score on top
        let myObj = tmp.results
        tmp.sortedResults = {}
        tmp.sortedResults = Object.keys(myObj).sort((a, b) => myObj[b] - myObj[a]).reduce((_sortedObj, key) => ({
          ..._sortedObj,
          [key]: myObj[key]
        }), {})
      }
      else {
        tmp.noResults = true
      }
    })
  },
  methods: {
    getData (topic) {
      this.votes = topic.votes
      this.proposals = topic.proposals
      this.negativeScore = topic.negativeScoreWeight
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
    getIndiScore (object, proposal) {
      let score = object[proposal]
      if (score < 0) score = score * this.negativeScore
      return score
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
