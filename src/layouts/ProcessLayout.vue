<template>
  <main-layout>
    <div >
      <InfoCard 
        :class="{ hide: id === undefined }" 
        :topic="topic"
        :proposalTimer="proposalTimer"
        :votingTimer="votingTimer"
        :negativeScoreWeight="negativeScoreWeight"
        />
      </div>
    <slot />
  </main-layout>
</template>

<script>
  import MainLayout from 'layouts/MainLayout'
  import { getTopic } from 'src/data'
  import InfoCard from '@/content/InfoCard'
  import { mapActions, mapState } from 'vuex'

  export default {
    components: {
      MainLayout,
      InfoCard
    },
    computed: {
      ...mapState([
        'proposals',
        'negativeScoreWeight',
        'votes',
        'selectedVoters'
      ])
    },
    methods: {
      ...mapActions([
        'updateTopic'
      ]),
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
        // this.proposalTimer = formatTime(this.topic.proposalTime)
        if (this.proposalTimer !== -1) {
          this.checkCorrectRoute('collect')
          this.votingTimeLabel = this.$t('Voting.duration')
          this.votingTimer = this.topic.votingInterval
        }
        else if (this.proposalTimer === -1) {
          // this.votingTimer = formatTime(this.topic.votingTime)
          if (this.votingTimer !== -1) {
            this.checkCorrectRoute('vote')
            this.votingTimeLabel = this.$t('Voting.ends')
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
      if (this.id !== undefined) {
        getTopic(this.id).then((topic) => {
          if (topic.error === 'not_found') {
            this.$router.push({ name: 'notfound', params: { id: this.id } })
          }
          this.$store.dispatch('updateTopic', topic)
          this.topic = topic
          if (topic.negativeScoreWeight === 'infinity') this.negativeScoreWeight = '∞'
          else this.negativeScoreWeight = 'x' + topic.negativeScoreWeight
        }).then(() => {
          this.timer()
          this.startIntervalUpdate()
        })
      }
    },
    beforeDestroy () {
      clearInterval(this.interval)
    },
    data () {
      return {
        id: '',
        topic: {},
        redirect: true,
        proposalTimer: '',
        votingTimer: ''
      }
    }
  }
</script>
<style lang="stylus" scoped>

  .hide
    display none
</style>
