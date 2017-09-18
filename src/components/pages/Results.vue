<template>
  <process-layout>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <p class="caption">Results!</p>
        <div v-for="(value, proposal) in sortedResults" :key="value">
          <q-item :class="{ yellow: getEmoji(proposal) === 3 }">
            <q-item-main :label="proposal" :sublabel="getDescription(proposal)"></q-item-main>
            <q-item-side>
              <img :src="'statics/emo/' + getEmoji(proposal) + '.svg'" height="32px" />
            </q-item-side>
          </q-item>
        </div>
      </q-card-main>
    </q-card>
    <q-card style="max-width: 700px; text-align: left;">
     <q-card-main>
       <p class="caption">Raw Data Table</p>
       <table class="q-table horizontal-seperator flipped vertical-separator">
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
import { QBtn, QCard, QCardMain, QField, QItem, QItemMain, QItemSide, QList } from 'quasar'
import { getTopic } from '@/data.js'

export default {
  components: {
    ProcessLayout,
    QBtn,
    QCard,
    QCardMain,
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
      // calculate the highest score
      tmp.genMax(tmp.results)

      // create an ordered lists with the highest score on top
      let myObj = tmp.results
      tmp.sortedResults = Object.keys(myObj).sort((a, b) => myObj[b] - myObj[a]).reduce((_sortedObj, key) => ({
        ..._sortedObj,
        [key]: myObj[key]
      }), {})
    })
  },
  methods: {
    getData (topic) {
      this.votes = topic.votes
      this.proposals = topic.proposals
    },
    genResults (name) {
      for (let proposal in this.proposals) {
        let vote = this.votes[name][proposal]
        if (vote < 0 && this.weightedScores) vote = vote * 3
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
      if (this.weightedScores && score < 0) score = score * 3
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
      let negativeWeight = 1
      if (this.weightedScores) negativeWeight = 2
      let p = this.getScore(proposal)
      let emo = 0
      if (p === this.max) emo = 3
      else if (p >= this.max - length) emo = 2
      else if (p >= this.max - length * 2) emo = 1
      else if (p >= this.max - length * 3) emo = 0
      else if (p >= this.max - length * 4 * negativeWeight) emo = -1
      else if (p >= this.max - length * 5 * negativeWeight) emo = -2
      else emo = -3
      return emo
    }
  },
  data () {
    return {
      results: {},
      sortedResults: {},
      percentages: {},
      proposals: {},
      total: 0,
      weightedScores: true
    }
  }
}
</script>
<style lang="stylus">
.red
  background-color #FFEBEE
.yellow
  background-color #ffffcc
table
  td
    height 64px
  th
    height 64px
</style>
