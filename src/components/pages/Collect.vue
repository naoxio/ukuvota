<template>
  <main-layout>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <h5><q-field :label="topic.question"></q-field></h5>
        <q-field :label="topic.description"></q-field>
        <q-item tag="label">
          <q-item-main label="Proposal Time Ends In" :sublabel="proposalTimer">          </q-item-main>
          <q-item-main label="Voting Time Will Last For" :sublabel="getVotingTime">          </q-item-main>
        </q-item>
      </q-card-main>
    </q-card>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <h5><q-field label="Add Proposal"></q-field></h5>
        <template v-if="proposalEmpty">
          <q-alert
            color="dark"
            icon="warning"
          >
            Proposal Is Empty
          </q-alert>
        </template>
        <template v-if="proposalExists">
          <q-alert
            color="dark"
            icon="warning"
            v-model="proposalExists"
          >
            Proposal Exists
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
        <q-item v-for="(description, title) in topic.proposals" :key="topic.proposals.key">
          <q-item-main :label="title" :sublabel="description"></q-item-main>
        </q-item>
      </q-list>
    </q-card>
  </main-layout>
</template>
<script>
import MainLayout from '@/layouts/MainLayout'
import { date, QAlert, QBtn, QCard, QCardMain, QCardMedia, QCardTitle, QField, QIcon, QInput, QItem, QItemSeparator, QItemMain, QItemTile, QItemSide, QList, QListHeader } from 'quasar'
import { loadTopic, saveTopic } from '@/data'

export default {
  components: {
    MainLayout,
    QAlert,
    QBtn,
    QCard,
    QCardMain,
    QCardMedia,
    QCardTitle,
    QField,
    QIcon,
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
    this.id = this.$route.params.id
    this.topic = loadTopic(this.id)
    if (this.topic === -1) {
      this.$router.push('/create')
    }
    else {
      this.setProposalTimer()
      this.startIntervalUpdate()
    }
  },

  methods: {
    addProposal () {
      let error = false
      // error check
      if (this.newProposal === '') {
        this.proposalEmpty = true
        this.proposalExists = false
        error = true
      }
      else {
        this.proposalEmpty = false
        if (typeof this.topic.proposals[this.newProposal] !== 'undefined') {
          this.proposalExists = true
          error = true
        }
        else {
          this.proposalExists = false
        }
      }
      if (!error) {
        this.topic.proposals[this.newProposal] = this.proposalDescription
        this.newProposal = ''
        this.proposalDescription = ''
      }
    },
    next () {
      clearInterval(this.timer)
      let done = saveTopic(this.id)
      console.log('done' + done)
      if (done) {
        // this.$router.push(this.$route.params.id + '/vote')
        this.$router.push({name: 'vote', params: { id: this.$route.params.id }})
      }
    },
    startIntervalUpdate () {
      let component = this
      this.timer = setInterval(function () {
        component.setProposalTimer()
      }, 1000)
    },
    setProposalTimer () {
      let today = new Date()
      let timeStamp = this.topic.proposalTime
      let diff = date.formatDate(timeStamp, 'x') - date.formatDate(today, 'x')
      if (diff < 0) {
        this.next()
      }
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
      let output = this.topic.votingTime
      if (output === 1) {
        return '1 day'
      }
      return output + ' days'
    }
  },
  data () {
    return {
      topic: '',
      newProposal: '',
      proposalTimer: '',
      proposalEmpty: false,
      proposalExists: false,
      proposalDescription: ''
    }
  }
}

</script>
<style lang="stylus">

</style>
