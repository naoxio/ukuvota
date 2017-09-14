<template>
  <process-layout>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <div v-for="(score, proposal) in results" :key="score">
          <q-list highlight>
            <q-item>
              <q-item-main :label="proposal"></q-item-main>
              <q-item-side>{{ getPercentage(score) }} %</q-item-side>
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
    this.genTotal(this.results)
  },
  methods: {
    genResults (name) {
      for (let proposal in this.proposals) {
        if (this.results[proposal] === undefined) {
          this.results[proposal] = this.votes[name][proposal]
        }
        else {
          this.results[proposal] = this.results[proposal] + this.votes[name][proposal]
        }
        setResults(this.id, this.results)
      }
    },
    genTotal (object) {
      this.total = 0
      for (let key in object) {
        this.total = this.total + object[key]
      }
    },
    getPercentage (score) {
      return Math.round((score / this.total) * 100)
    }
  },
  data () {
    return {
      results: {},
      percentages: {},
      total: 0
    }
  }
}
</script>
<style lang="stylus">

</style>
