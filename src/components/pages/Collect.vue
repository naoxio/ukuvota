<template>
  <main-layout>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <h5><q-field :label="topicQuestion"></q-field></h5>
        <q-field :label="topicDescription"></q-field>
        <q-item tag="label">
          <q-item-main label="Proposal Time Ends In" :sublabel="proposalTimer">          </q-item-main>
          <q-item-main label="Voting Time Will Last For" :sublabel="getVotingTime">          </q-item-main>
        </q-item>
      </q-card-main>
    </q-card>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <h5><q-field label="Add Proposal"></q-field></h5>
        <template v-if="proposalMissing && proposalMissing !== null">
          <q-alert
            color="dark"
            icon="warning"
          >
            proposal is empty
          </q-alert>
        </template>
        <q-input v-model="newProposal" float-label="Proposal" />
        <q-input v-model="proposalDescription" float-label="Description (optional)" />
        <div class="row justify-end">
          <q-btn @click="addProposal">Add</q-btn>
        </div>
      </q-card-main>
    </q-card>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <h5><q-field label="Current Proposals"></q-field></h5>
      </q-card-main>
      <q-list highlight>
        <div class="row">
          <div class="col-6">
            <q-item v-for="title in proposals.title" :key="proposals.key">
              <q-item-tile>
                {{ title }}
              </q-item-tile>
            </q-item>
          </div>
          <div class="col-6">
            <q-item v-for="description in proposals.description" :key="proposals.key">
              <q-item-side>
                {{ description }}
              </q-item-side>
            </q-item>
          </div>
        </div>
      </q-list>
    </q-card>
  </main-layout>
</template>
<script>
import MainLayout from '@/layouts/MainLayout'
import { date, LocalStorage, QBtn, QCard, QCardMain, QCardMedia, QCardTitle, QField, QInput, QItem, QItemSeparator, QItemMain, QItemTile, QItemSide, QList, QListHeader } from 'quasar'
const
  { subtractToDate } = date

export default {
  components: {
    MainLayout,
    QBtn,
    QCard,
    QCardMain,
    QCardMedia,
    QCardTitle,
    QField,
    QInput,
    QItem,
    QItemSeparator,
    QItemMain,
    QItemSide,
    QItemTile,
    QList,
    QListHeader
  },
  mounted () {
    this.loadData()
  },
  methods: {
    addProposal () {
      let error = false
      // error check
      if (this.newPropsal === '') {
        this.proposalMissing = true
        error = true
      }
      else {
        this.proposalMissing = false
      }
      if (!error) {
        this.proposals.title.push(this.newProposal)
        this.proposals.description.push(this.proposalDescription)
      }
    },
    loadData () {
      let topics = JSON.parse(LocalStorage.get.item('topics'))
      let index = -1
      for (let x = 0; x < topics.length; x++) {
        if (topics[x].id === this.$route.params.id) {
          index = x
        }
      }
      if (index === -1) {
        this.$router.push('/newTopic')
      }
      let tmp = topics[index]
      this.topicQuestion = tmp.topicQuestion
      this.topicDescription = tmp.description
      this.proposalTime = tmp.proposalTime
      this.votingTime = tmp.votingTime
      this.proposals = tmp.proposals
      this.id = tmp.id
      this.setProposalTimer()
      this.startIntervalUpdate()
      // this.$route.params.id
    },
    next () {

    },
    startIntervalUpdate () {
      let component = this
      setInterval(function () {
      /*  if (timeToStopConditionMet) {
          clearInterval(timerId);
          return;
        } */
        component.setProposalTimer()
      }, 1000)
    },
    setProposalTimer () {
      let today = new Date()
      let timeStamp = this.proposalTime
      let diff = date.formatDate(timeStamp, 'x') - date.formatDate(today, 'x')
      let days = date.formatDate(diff, 'D')
      let hours = date.formatDate(diff, 'h')
      let minutes = date.formatDate(diff, 'm')
      let seconds = date.formatDate(diff, 's')
      let output = ''
      if (days > 1) {
        output = days + ' days and ' + hours + ' hours'
      }
      else if (hours > 1) {
        output = hours + ' hours and ' + minutes + ' minutes'
      }
      else if (minutes > 1) {
        output = minutes + ' minutes and ' + seconds + ' seconds'
      }
      else if (seconds > 1) {
        output = seconds + ' seconds'
      }
      else if (seconds > 0) {
        output = '1 second'
      }
      else {
        // let endVoting = addToDate(today, {days: (this.votingSelect + this.proposalSelect)})
        this.next()
      }
      this.proposalTimer = output
    }
  },
  computed: {
    getVotingTime () {
      let output = this.votingTime
      if (output === 1) {
        return '1 day'
      }
      return output + ' days'
    }
  },
  data () {
    return {
      topicQuestion: '',
      topicDescription: '',
      proposalTime: '',
      votingTime: '',
      proposals: '',
      newProposal: '',
      proposalTimer: '',
      proposalMissing: false,
      proposalDescription: ''
    }
  }
}

</script>
<style lang="stylus">

</style>
