<template>
  <main-layout>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <h5><q-field :label="topic.question" /></h5>
        <q-field :label="topic.description" />
        <q-item v-if="votingTimer !== -1 || proposalTimer !== -1" tag="label">
          <q-item-main v-if="proposalTimer !== -1" label="Proposal time ends in" :sublabel="proposalTimer"/>
          <q-item-main v-if="votingTimer !== -1" label="Voting time will last for" :sublabel="votingTimer"/>
        </q-item>
        <q-item>
          <q-item-main label="Negative Score Multiplier" :sublabel="negativeScoreWeightLabel"/>
        </q-item>
        <br>
        <q-field label="Shareable URL"/>
        <input style="width: 100%" onClick="this.select();" :value="urlpath"/>
      </q-card-main>
    </q-card>
    <slot/>
  </main-layout>
</template>

<script>
import MainLayout from './MainLayout'
import { QCard, QCardMain, QField, QItem, QItemMain } from 'quasar'
import { getTopic } from 'src/data'
import { formatTime } from 'src/timer'

export default {
  components: {
    MainLayout, QCard, QCardMain, QField, QItem, QItemMain
  },
  methods: {
    timer () {
      this.autoRedirect()
    },
    startIntervalUpdate (time) {
      let component = this
      this.interval = setInterval(function () {
        component.timer()
      }, 1000)
    },
    autoRedirect () {
      this.proposalTimer = formatTime(this.topic.proposalTime)
      if (this.proposalTimer !== -1) {
        if (this.$route.name.indexOf('collect') === -1) this.goToCollect()
        this.votingTimeLabel = 'Voting Time Will Last For'
        this.votingTimer = this.topic.votingInterval
      }
      else if (this.proposalTimer === -1) {
        if (this.$route.name.indexOf('collect') !== -1) this.goToVote()
        this.votingTimer = formatTime(this.topic.votingTime)
        if (this.votingTimer !== -1) {
          if (this.$route.name.indexOf('vote') === -1) this.goToVote()
          this.voringTimeLabel = 'Voting Time Ends In'
        }
        else if (this.votingTimer === -1) {
          if (this.$route.name.indexOf('results') === -1) this.goToResults()
        }
      }
    },
    goToCollect () {
      this.$router.push({name: 'collect', params: { id: this.id }})
    },
    goToVote () {
      this.$router.push({name: 'vote', params: { id: this.id }})
    },
    goToResults () {
      this.$router.push({name: 'results', params: { id: this.id }})
    },
    setData (topic) {
      this.topic = topic
      this.timer()
      this.startIntervalUpdate()
      this.negativeScoreWeightLabel = 'x' + topic.negativeScoreWeight
    },
    error (error) {
      console.log('error with getting topic: ' + error)
      this.$router.push({name: 'create'})
    }
  },
  mounted () {
    this.id = this.$route.params.id
    getTopic(this.id).then(this.setData).catch(this.error)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  data () {
    return {
      topic: '',
      urlpath: window.location.href,
      proposalTimer: '',
      votingTimeLabel: 'Voting time will last for',
      votingTimer: '',
      negativeScoreWeightLabel: ''
    }
  }
}

</script>

<style lang="styl">

</style>
