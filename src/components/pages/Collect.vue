<template>
  <process-layout>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <h5><q-field label="Add Proposal"></q-field></h5>
        <q-field :error-label="getProposalError()" >
          <q-input
            v-model="newProposal"
            float-label="Proposal"
            :error="proposalExists || proposalEmpty"
          />
        </q-field>
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
        <q-item v-for="(description, title) in proposals" :key="title">
          <q-item-main :label="title" :sublabel="description"></q-item-main>
        </q-item>
      </q-list>
    </q-card>
  </process-layout>
</template>
<script>
import ProcessLayout from '@/layouts/ProcessLayout'
import { QBtn, QCard, QCardMain, QField, QInput, QItem, QItemMain, QList } from 'quasar'
import { addProposal, getProposals } from '@/data'

export default {
  components: {
    ProcessLayout,
    QBtn,
    QCard,
    QCardMain,
    QField,
    QInput,
    QItem,
    QItemMain,
    QList
  },
  mounted () {
    this.id = this.$route.params.id
  },
  methods: {
    getProposalError () {
      if (this.proposalExists) return 'The Proposal Already Exists'
      else if (this.proposalEmpty) return 'Proposal is Empty'
    },
    update () {
      getProposals(this.id).then(proposals => this.proposals = proposals)
    },
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
        addProposal(this.id, this.newProposal, this.proposalDescription)
        this.newProposal = ''
        this.proposalDescription = ''
        this.update()
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
