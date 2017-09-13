<template>
  <process-layout>
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
        <q-item v-for="(description, title) in proposals" :key="proposals.key">
          <q-item-main :label="title" :sublabel="description"></q-item-main>
        </q-item>
      </q-list>
    </q-card>
  </process-layout>
</template>
<script>
import ProcessLayout from '@/layouts/ProcessLayout'
import { QAlert, QBtn, QCard, QCardMain, QCardMedia, QCardTitle, QField, QIcon, QInput, QItem, QItemSeparator, QItemMain, QItemTile, QItemSide, QList, QListHeader } from 'quasar'
import { getProposals, setProposals } from '@/data'

export default {
  components: {
    ProcessLayout,
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
    this.proposals = getProposals(this.id)
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
        if (typeof this.proposals[this.newProposal] !== 'undefined') {
          this.proposalExists = true
          error = true
        }
        else {
          this.proposalExists = false
        }
      }
      if (!error) {
        this.proposals[this.newProposal] = this.proposalDescription
        setProposals(this.id, this.proposals)
        this.newProposal = ''
        this.proposalDescription = ''
      }
    }
  },
  data () {
    return {
      proposals: '',
      urlpath: window.location.href,
      newProposal: '',
      proposalEmpty: false,
      proposalExists: false,
      proposalDescription: ''
    }
  }
}

</script>
<style lang="stylus">

</style>
