<template>
  <main-layout>
    <InfoCard 
      :topic="topic"
      :proposalTimer="proposalTimer"
      :votingTimeLabel="this.$t('Voting.time.duration')"
      :votingTimer="votingTimer"
      :negativeScoreWeightLabel="negativeScoreWeightLabel"
      />
    <slot />
  </main-layout>
</template>

<script>
  import MainLayout from 'layouts/MainLayout'
  import { getTopic } from 'src/data'
  import { formatTime } from 'src/timer'
  import InfoCard from '@/InfoCard'

  export default {
    components: {
      MainLayout,
      InfoCard
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
