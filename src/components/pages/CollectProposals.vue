<template>
  <main-layout>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <h5><q-field :label="topicQuestion"></q-field></h5>
        <q-field :label="description"></q-field>
        <q-item tag="label">
          <q-item-main label="Proposal Collection Time" :sublabel="getProposalTime">          </q-item-main>
        </q-item>
        <q-item tag="label">
          <q-item-main label="Voting Time" :sublabel="getVotingTime">          </q-item-main>
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
import { LocalStorage, QBtn, QCard, QCardMain, QCardMedia, QCardTitle, QDatetimeRange, QField, QInput, QItem, QItemSeparator, QItemMain, QItemTile, QItemSide, QList, QListHeader } from 'quasar'

let getTimeEnding = (time) => {
  if (time === 1) {
    time = '1 Day'
  }
  else {
    time = time + ' Days'
  }
  return time
}

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
      this.topicQuestion = tmp.topicQuestion
      this.description = tmp.description
      this.proposalTime = tmp.proposalTime
      this.votingTime = tmp.votingTime
      this.proposals = tmp.proposals
      console.log(this.votingTime)
      // this.$route.params.id
    }
  },
  computed: {
    getProposalTime () {
      return getTimeEnding(this.proposalTime)
    },
    getVotingTime () {
      return getTimeEnding(this.votingTime)
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
