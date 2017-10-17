<template>
  <process-layout>
    <UCard>
      <div v-if="noResults">
        <NoResults />
      </div>
      <div v-else>
        <EmojiResults :results="sortedResults" :votes="votes" :proposals="proposals" :max="max"/>
        <p class="caption">{{ $t('Names.voted') }}:</p>
        <NameList :votes="votes" :select="false" />
        </br>
        <div class="row justify-between">
          <p style="color: red"> {{ $t('Results.disclaimer')}} </p>
          <DataTable :proposals="proposals" :votes="votes" :negativeScore="negativeScore" />
        </div>
      </div>
    </UCard>
  </process-layout>
</template>
<script>
import ProcessLayout from 'layouts/ProcessLayout'
import UCard from '@/General/UCard'
import { getTopic } from 'src/data'
import DataTable from '@/Modal/DataTable'
import NoResults from '@/Content/NoResults'
import NameList from '@/List/Names'
import EmojiResults from '@/List/EmojiResults'

export default {
  components: {
    ProcessLayout,
    UCard,
    DataTable,
    NameList,
    NoResults,
    EmojiResults
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
      noResults: false
    }
  }
}
</script>
