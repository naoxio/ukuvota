<template>
  <main-layout>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <h5><q-field :label="topic.question" /></h5>
        <q-field :label="topic.description" />
        <div class="row justify-between">
          <div v-if="proposalTimer !== -1">
            {{ $t('Proposal.time.label') }}
            <p class="text-dark">{{ proposalTimer }}</p>
          </div>
          <div v-if="votingTimer !== -1">
            {{ $t('Voting.time.duration') }}
            <p class="text-dark">{{ votingTimer }}</p>
          </div>  
          <div>
            {{ $t('NegativeScoreWeighting') }}
            <p class="text-dark">{{ negativeScoreWeightLabel }}
              <NegativeScoreInfo/>
            </p>
          </div>
        </div>
        <q-field :label="$t('ShareableURL')" />
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
        if (this.redirect) this.autoRedirect()
      },
      startIntervalUpdate (time) {
        let component = this
        this.interval = setInterval(function () {
          component.timer()
        }, 1000)
      },
      checkCorrectRoute (targetRoute) {
        let currentRoute = this.$route.name
        let routeNames = ['collect', 'vote', 'results']
        if (currentRoute !== targetRoute && routeNames.indexOf(currentRoute) >= 0) {
          this.goTo(targetRoute)
        }
      },
      autoRedirect () {
        this.proposalTimer = formatTime(this.topic.proposalTime)
        if (this.proposalTimer !== -1) {
          this.checkCorrectRoute('collect')
          this.votingTimeLabel = this.$t('Voting.time.duration')
          this.votingTimer = this.topic.votingInterval
        }
        else if (this.proposalTimer === -1) {
          this.votingTimer = formatTime(this.topic.votingTime)
          if (this.votingTimer !== -1) {
            this.checkCorrectRoute('vote')
            this.votingTimeLabel = this.$t('Voting.time.ends')
          }
          else if (this.votingTimer === -1) {
            this.checkCorrectRoute('results')
          }
        }
      },
      goTo (route) {
        this.$router.push({ name: route, params: { id: this.id } })
      }
    },
    mounted () {
      this.id = this.$route.params.id
      getTopic(this.id).then((topic) => {
        this.topic = topic
        if (topic.negativeScoreWeight === 'infinity') this.negativeScoreWeightLabel = '∞'
        else this.negativeScoreWeightLabel = 'x' + topic.negativeScoreWeight
      }).then(() => {
        this.timer()
        this.startIntervalUpdate()
      })
    },
    beforeDestroy () {
      clearInterval(this.interval)
    },
    data () {
      return {
        redirect: true,
        topic: '',
        urlpath: window.location.href,
        proposalTimer: '',
        votingTimeLabel: this.$t('Voting.time.duration'),
        votingTimer: '',
        negativeScoreWeightLabel: ''
      }
    }
  }
</script>

<style lang="styl">
  
</style>
