<template>
  <main-layout>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <h5><q-field :label="topic.question" /></h5>
        <q-field :label="topic.description" />
        <q-item v-if="votingTimer !== -1 || proposalTimer !== -1" tag="label">
          <div class="row">
            <q-item-main v-if="proposalTimer !== -1">
              {{ $t('Proposal.time.label') }}
              <p class="text-dark">{{ proposalTimer }}</p>
            </q-item-main>
            <q-item-main v-if="votingTimer !== -1">
              {{ $t('Voting.time.duration') }}
              <p class="text-dark">{{ votingTimer }}</p>
            </q-item-main>    
          </div>
        </q-item>
        <q-item>
          <q-item-main>
            {{ $t('NegativeScoreMultiplier') }}
            <p class="text-dark">{{ negativeScoreWeightLabel }}
              <NegativeScoreInfo/>
            </p>
          </q-item-main>
        </q-item>
        <q-field label="Shareable URL" />
        <input style="width: 100%" onClick="this.select();" :value="urlpath" />
      </q-card-main>
    </q-card>
    <slot/>
  </main-layout>
</template>

<script>
  import MainLayout from './MainLayout'
  import {
    QCard,
    QCardMain,
    QField,
    QItem,
    QItemMain
  } from 'quasar'
  import {
    getTopic
  } from 'src/data'
  import {
    formatTime
  } from 'src/timer'
  import NegativeScoreInfo from '@/NegativeScoreInfo'
  
  export default {
    components: {
      MainLayout,
      NegativeScoreInfo,
      QCard,
      QCardMain,
      QField,
      QItem,
      QItemMain
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
        this.$router.push({
          name: 'collect',
          params: {
            id: this.id
          }
        })
      },
      goToVote () {
        this.$router.push({
          name: 'vote',
          params: {
            id: this.id
          }
        })
      },
      goToResults () {
        this.$router.push({
          name: 'results',
          params: {
            id: this.id
          }
        })
      },
      setData (topic) {
        this.topic = topic
        this.timer()
        this.startIntervalUpdate()
        this.negativeScoreWeightLabel = 'x' + topic.negativeScoreWeight
      },
      error (error) {
        console.log('error with getting topic: ' + error)
        this.$router.push({
          name: 'create'
        })
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
