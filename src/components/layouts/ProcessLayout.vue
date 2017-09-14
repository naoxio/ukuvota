<template>
  <main-layout>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <h5><q-field :label="topic.question"></q-field></h5>
        <q-field :label="topic.description"></q-field>
        <q-item tag="label">
          <q-item-main v-if="proposalTimer !== -1" label="Proposal Time Ends In" :sublabel="proposalTimer">          </q-item-main>
          <q-item-main label="Voting Time Will Last For" :sublabel="votingTimer">          </q-item-main>
        </q-item>
        <br>
        <q-field label="Shareable URL"></q-field>
        <input style="width: 100%" onClick="this.select();" :value="urlpath"></input>
      </q-card-main>
    </q-card>
    <slot></slot>
  </main-layout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout'
import { QCard, QCardMain, QField, QItem, QItemMain } from 'quasar'
import { getTopic } from '@/data'
import { getVotingTime, formatTime } from '@/timer'

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
        if (this.$route.path.indexOf(this.id + '/collect') === -1) this.goToCollect()
        this.votingTimeLabel = 'Voting Time Will Last For'
        this.votingTimer = getVotingTime(this.topic.votingInterval)
      }
      else if (this.proposalTimer === -1) {
        if (this.$route.path.indexOf(this.id + '/collect') !== -1) this.goToVote()
        this.votingTimer = formatTime(this.topic.votingTime)
        if (this.votingTimer !== -1) {
          if (this.$route.path.indexOf(this.id + '/vote') === -1) this.goToVote()
          this.voringTimeLabel = 'Voting Time Ends In'
        }
        else if (this.votingTimer === -1) {
          if (this.$route.path.indexOf(this.id + '/vote') !== -1) this.goToResult()
        }
      }
    },
    goToCollect () {
      this.$router.push({name: 'collect', params: { id: this.id }})
    },
    goToVote () {
      this.$router.push({name: 'vote', params: { id: this.id }})
    },
    goToResult () {
      this.$router.push({name: 'result', params: { id: this.id }})
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.topic = getTopic(this.id)
    if (this.topic === -1) {
      this.$router.push({name: '/create'})
    }
    else {
      this.timer()
      this.startIntervalUpdate()
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  data () {
    return {
      topic: '',
      urlpath: window.location.href,
      proposalTimer: '',
      votingTimeLabel: 'Voting Time Will Last For',
      votingTimer: ''
    }
  }
}

</script>

<style lang="styl">

</style>
