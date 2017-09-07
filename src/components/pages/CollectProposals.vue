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
        <q-item v-for="proposal in proposals">
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

let currentTopic = {}
let loadData = () => {
  let topics = JSON.parse(LocalStorage.get.item('topics'))
  currentTopic = topics[0]
}

let getTimeEnding = (time) => {
  if (time === 1) {
    time = '1 Day'
  }
  else {
    time = time + ' Days'
  }
  return time
}

window.addEventListener('load', loadData())

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
  methods: {
    addProposal () {
      this.proposals.push(this.newProposal)
    }
  },
  computed: {
    getProposalTime () {
      return getTimeEnding(currentTopic.proposalTime)
    },
    getVotingTime () {
      return getTimeEnding(currentTopic.votingTime)
    }
  },
  data () {
    return {
      topicQuestion: currentTopic.topicQuestion,
      description: currentTopic.description,
      proposalTime: currentTopic.proposalTime,
      votingTime: currentTopic.votingTime,
      proposals: currentTopic.proposals,
      newProposal: ''
    }
  }
}

</script>
<style lang="stylus">

</style>
