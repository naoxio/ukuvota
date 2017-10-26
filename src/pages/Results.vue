<template>
  <process-layout>
    <u-card v-if="noResults">
      <NoResults />
    </u-card>
    <u-card v-else>
      <q-tabs class="tabs" align="justify">
        <!-- Tabs - notice slot="title" -->
        <q-tab @click="ctx=false" default slot="title" name="tab-1" icon="tag faces" />
        <q-tab @click="ctx='table'"slot="title" name="tab-2" icon="view list" />
        <q-tab @click="ctx=false" slot="title" name="tab-3" icon="settings" />
            <!-- Targets -->
        <q-tab-pane name="tab-1">
          <EmojiView :negativeScore="negativeScore" :results="sortedResults" :votes="votes" :proposals="proposals" :max="max"/>
        </q-tab-pane>
        <q-tab-pane class="nopad" name="tab-2">
          <DataTable />
        </q-tab-pane>
        <q-tab-pane name="tab-3">
          <Settings />
        </q-tab-pane>
      </q-tabs>
    </u-card>
    <Export :canvas="ctx"/>
  </process-layout>
</template>
<script>
  import ProcessLayout from 'layouts/ProcessLayout'
  import UCard from '@/General/UCard'
  import { getTopic } from 'src/data'
  import DataTable from '@/Results/DataTable'
  import NoResults from '@/Results/NoVotes'
  import EmojiView from '@/Results/EmojiView'
  import Settings from '@/Results/Settings'
  import { QTabs, QTab, QTabPane } from 'quasar'
  import Export from '@/Results/Export'

  export default {
    components: {
      Export,
      ProcessLayout,
      UCard,
      DataTable,
      NoResults,
      EmojiView,
      Settings,
      QTabs,
      QTab,
      QTabPane
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
        ctx: false
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .tabs
    max-width 700px
    margin 0
  .nopad
    padding 0
</style>
