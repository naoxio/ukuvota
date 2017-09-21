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
      <q-list>
        <div v-for="(description, title) in proposals" :key="title">
          <q-item v-if="title !== '_'">
            <q-item-main  :label="title" :sublabel="description"></q-item-main>
          </q-item>
        </div>
      </q-list>
    </q-card>
  </process-layout>
</template>
<script>
import ProcessLayout from 'layouts/ProcessLayout'
import { QBtn, QCard, QCardMain, QField, QInput, QItem, QItemMain, QList } from 'quasar'
import { getProposals, setProposal } from 'src/data'

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
    this.updateProposals()
  },
  methods: {
    updateProposals () {
      getProposals(this.id).on((proposals) => {
        this.proposals = proposals
      })
    },
    getProposalError () {
      if (this.proposalExists) return 'The Proposal Already Exists'
      else if (this.proposalEmpty) return 'Proposal is Empty'
    },
    addProposal () {
      let error = false
      // error check
      if (this.newProposal.replace(/\s/g, '').length <= 0) {
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
        let t = this
        setProposal(this.id, this.newProposal, this.proposalDescription).on(() => {
          t.newProposal = ''
          t.proposalDescription = ''
          t.updateProposals()
        })
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
