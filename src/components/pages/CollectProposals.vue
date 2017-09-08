<template>
  <main-layout>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <h5><q-field :label="topicQuestion"></q-field></h5>
        <q-field :label="description"></q-field>
        <q-item tag="label">
          <q-item-main label="Proposal Time Ends In" :sublabel="getProposalTime">          </q-item-main>
          <q-item-main label="Voting Time Will Last For" :sublabel="getVotingTime">          </q-item-main>
        </q-item>
      </q-card-main>
    </q-card>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <h5><q-field label="Add Proposal"></q-field></h5>
        <div class="row justify-between items-center" >
          <div class="col-9">
            <q-input v-model="newProposal" float-label="Proposal" />
          </div>
          <div class="col-2">
            <q-btn @click="addProposal">Add</q-btn>
          </div>
          <div class="col-auto">
          </div>
        </div>
      </q-card-main>
    </q-card>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <h5><q-field label="Current Proposals"></q-field></h5>
      </q-card-main>
      <q-list highlight>
        <q-item v-for="proposal in proposals" :key="proposal.id">
          <q-item-main>
            <q-item-tile label>{{ proposal }}</q-item-tile>
          </q-item-main>
        </q-item>
        <q-item-separator />
      </q-list>
    </q-card>
  </main-layout>
</template>
<script>
import MainLayout from '@/layouts/MainLayout'
import { date, LocalStorage, QBtn, QCard, QCardMain, QCardMedia, QCardTitle, QDatetimeRange, QField, QInput, QItem, QItemSeparator, QItemMain, QItemTile, QItemSide, QList, QListHeader } from 'quasar'

const
  today = new Date()

export default {
  components: {
    MainLayout,
    QBtn,
    QCard,
    QCardMain,
    QCardMedia,
    QCardTitle,
    QDatetimeRange,
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
  updated () {
    this.$nextTick(function () {
      console.log('hihi')
    })
  },
  methods: {
    addProposal () {
      this.proposals.push(this.newProposal)
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
      console.log(index)
      console.log(topics[index])
      this.topicQuestion = tmp.topicQuestion
      this.description = tmp.description
      this.proposalTime = tmp.proposalTime
      this.votingTime = tmp.votingTime
      this.proposals = tmp.proposals
      this.id = tmp.id
      // this.$route.params.id
    },
    getProposalTimeEnding (timeStamp, id) {
      let days = date.formatDate(timeStamp, 'DD') - date.formatDate(today, 'DD')
      let hours = date.formatDate(timeStamp, 'HH') - date.formatDate(today, 'HH')
      let minutes = date.formatDate(timeStamp, 'mm') - date.formatDate(today, 'mm')
      let seconds = date.formatDate(timeStamp, 'ss') - date.formatDate(today, 'ss')
      let output = ''
      console.log('today ' +date.formatDate(today, 'DD'))
      console.log('today ' +date.formatDate(timeStamp, 'DD'))

      console.log(days)
      if (days > 1) {
        output = days + ' days left and ' + hours + ' hours left'
      }
      else if (hours > 1) {
        output = hours + ' hours left and ' + minutes + ' minutes left'
      }
      else if (minutes > 1) {
        output = minutes + ' minutes left and ' + seconds + ' seconds left'
      }
      else if (seconds > 0) {
        output = seconds + ' seconds left'
      }
      else {
        // this.$router.push(this.id + '/vote')
      }

      return output
    }
  },
  computed: {
    getProposalTime () {
      let timeStamp = this.proposalTime
      let days = date.formatDate(timeStamp, 'DD') - date.formatDate(today, 'DD')
      let hours = date.formatDate(timeStamp, 'HH') - date.formatDate(today, 'HH')
      let minutes = date.formatDate(timeStamp, 'mm') - date.formatDate(today, 'mm')
      let seconds = date.formatDate(timeStamp, 'ss') - date.formatDate(today, 'ss')
      let output = ''
      console.log('today ' + date.formatDate(today, 'DD'))
      console.log('today ' + date.formatDate(timeStamp, 'DD'))

      console.log(days)
      if (days > 1) {
        output = days + ' days left and ' + hours + ' hours left'
      }
      else if (hours > 1) {
        output = hours + ' hours left and ' + minutes + ' minutes left'
      }
      else if (minutes > 1) {
        output = minutes + ' minutes left and ' + seconds + ' seconds left'
      }
      else if (seconds > 0) {
        output = seconds + ' seconds left'
      }
      else {
        // let endVoting = addToDate(today, {days: (this.votingSelect + this.proposalSelect)})
        // this.$router.push(this.id + '/vote')
      }

      return output
    },
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
      description: '',
      proposalTime: '',
      votingTime: '',
      proposals: '',
      newProposal: ''
    }
  }
}

</script>
<style lang="stylus">

</style>
