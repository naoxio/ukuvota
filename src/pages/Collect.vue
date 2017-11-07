<template>
  <process-layout>
    <UCard>
      <h5><ULabel :value="$t('Proposals.current')"/></h5>
      <div v-for="(obj, id) in proposals" :key="id">
        <UItem
          :uid="id"
          editifblank="true"
          class="item"
          :editable="true"
          :label="obj.title"
          @update:newData="val => updateProposal(val)"
          :sublabel="obj.description"
          :floatlabel="$t('Proposal.title')"
          :floatsublabel="$t('DescriptionLabel')"
          />
      </div>
    </UCard>
    <q-fixed-position corner="bottom-right" :offset="[18, 18]">
      <q-btn round color="primary" icon="add" @click="addProposal"/>
    </q-fixed-position>
  </process-layout>
</template>
<script>
  import ProcessLayout from 'layouts/ProcessLayout'

  import { uid, scroll, QBtn, QFixedPosition, QIcon } from 'quasar'
  import { getProposals, setProposal } from 'src/data'
  import UAlert from '@/general/UAlert'
  import UCard from '@/general/UCard'
  import UInput from '@/general/UInput'
  import UItem from '@/general/UItem'
  import ULabel from '@/general/ULabel'

  const { setScrollPosition } = scroll
  export default {
    components: {
      ProcessLayout,
      UCard,
      UAlert,
      UInput,
      UItem,
      ULabel,
      QBtn,
      QFixedPosition,
      QIcon
    },
    mounted () {
      this.id = this.$route.params.id
      this.updateProposals()
    },
    methods: {
      updateProposal (p) {
        let newProposal = { id: p.uid, title: p.label, description: p.sublabel }
        setProposal(this.id, newProposal).then(log => { })
      },
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
        setScrollPosition(window, document.body.scrollHeight)
        setProposal(this.id, { id: uid(), title: '', description: '' }).then(() => {
          this.updateProposals()
        })
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
<style lang="stylus" scoped>


</style>
