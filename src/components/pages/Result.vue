<template>
  <process-layout>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <div v-for="(description, proposal) in proposals" :key="proposal">
          <q-list highlight>
            <q-item>
              <q-item-main :label="proposal" :sublabel="description"></q-item-main>
              <q-item-side>
                {{ getPercentage(proposal) }} %
                <img :src="'statics/emo/' + getEmoji(proposal) + '.svg'" height="32px" />
              </q-item-side>
            </q-item>
          </q-list>
        </div>
      </q-card-main>
    </q-card>
  </process-layout>
</template>
<script>
import ProcessLayout from '@/layouts/ProcessLayout'
import { QBtn, QCard, QCardMain, QField, QItem, QItemMain, QItemSide, QList } from 'quasar'
import { getVotes, getProposals, setResults } from '@/data.js'

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
    this.votes = getVotes(this.id)
    this.proposals = getProposals(this.id)
    this.results = {}
    for (let name in this.votes) {
      this.genResults(name)
    }
    this.genMax(this.results)
    console.log(this.total)
  },
  methods: {
    genResults (name) {
      for (let proposal in this.proposals) {
        let vote = this.votes[name][proposal]
        if (vote < 0) vote = vote * 3
        if (this.results[proposal] === undefined) {
          this.results[proposal] = vote
        }
        else {
          this.results[proposal] = this.results[proposal] + vote
        }
        setResults(this.id, this.results)
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
      console.log(score, this.max)
      return Math.round((score / this.max) * 100)
    },
    getEmoji (proposal) {
      let p = this.getPercentage(proposal)
      let emo = 0
      if (p > 86) emo = 3
      else if (p > 71) emo = 2
      else if (p > 57) emo = 1
      else if (p > 43) emo = 0
      else if (p > 29) emo = -1
      else if (p > 14) emo = -2
      else emo = -3
      return emo
    }
  },
  data () {
    return {
      results: {},
      percentages: {},
      proposals: {},
      total: 0
    }
  }
}
</script>
<style lang="stylus">

</style>
