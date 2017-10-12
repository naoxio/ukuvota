<template>
  <process-layout>
    <ProcessCard>
      <h5><ULabel :value="$t('Proposal.add')"/></h5> 
      <UAlert :submitted="submitted" :value="$t('Proposal.added', { submittedProposal })" />
      <UInput
        ref="pT"
        :value.sync="newProposal"
        :float-label="$t('Proposal.title')"
        :error="proposalExists || proposalEmpty"
        :error-label="getProposalError()" 
      />
      <UInput ref="pD" :value.sync="proposalDescription" :float-label="$t('DescriptionLabel')" />
      <div class="row justify-end">
        <q-btn @click="addProposal">{{ $t('Add') }}</q-btn>
      </div>
    </ProcessCard>
    <ProcessCard>
      <h5><ULabel :value="$t('Proposals.current')"/></h5>
      <q-list>
        <div v-for="(description, title) in proposals" :key="title">
          <q-item v-if="title !== '_'">
            <q-item-main  :label="title" :sublabel="description"></q-item-main>
          </q-item>
        </div>
      </q-list>
    </ProcessCard>
  </process-layout>
</template>
<script>
  import ProcessLayout from 'layouts/ProcessLayout'
  import ProcessCard from 'layouts/ProcessCard'
  import { QBtn, QField, QInput, QItem, QItemMain, QList } from 'quasar'
  import { getProposals, setProposal } from 'src/data'
  import UInput from '@/UInput'
  import ULabel from '@/ULabel'
  import UAlert from '@/UAlert'

  export default {
    components: {
      ProcessLayout,
      ProcessCard,
      UAlert,
      UInput,
      ULabel,
      QBtn,
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
        getProposals(this.id).then((proposals) => {
          this.proposals = proposals
        })
      },
      getProposalError () {
        if (this.proposalExists) return this.$t('Proposal.exists')
        else if (this.proposalEmpty) return this.$t('Proposal.empty')
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
          setProposal(this.id, this.newProposal, this.proposalDescription).then(() => {
            t.submitted = true
            t.submittedProposal = t.newProposal
            t.newProposal = ''
            t.proposalDescription = ''
            t.$refs.pT.val = ''
            t.$refs.pD.val = ''
            this.updateProposals()
          })
        }
      }
    },
    data () {
      return {
        proposals: '',
        submittedProposal: '',
        submitted: false,
        urlpath: window.location.href,
        newProposal: '',
        proposalEmpty: false,
        proposalExists: false,
        proposalDescription: ''
      }
    }
  }

</script>
