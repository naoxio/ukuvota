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
          <q-item-main label="Voting Time" :sublabel="getProposalTime">          </q-item-main>
        </q-item>
      </q-card-main>
    </q-card>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <h5><q-field label="Add Proposal"></q-field></h5>
        <div class="row justify-between items-center" >
          <div class="col-8">
            <q-input v-model="addProposal" float-label="Proposal" />
          </div>
          <div class="col-3">
            <q-btn icon="arrow forward">Add</q-btn>
          </div>
        </div>
      </q-card-main>
    </q-card>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <h5><q-field label="Current Proposals"></q-field></h5>

      </q-card-main>
      <q-list highlight>
        <q-item>
          <q-item-main>
            <q-item-tile label>Change Nothing</q-item-tile>
          </q-item-main>
        </q-item>
        <q-item-separator />
        <q-item>
          <q-item-main label="Repeat Process " />
        </q-item>
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
  console.log(currentTopic)
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
      addProposal: ''
    }
  }
}

</script>
<style lang="stylus">

</style>
