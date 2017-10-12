<template>
  <ProcessCard>
    <h5><ULabel :value="topic.question" /></h5>
    <ULabel class="desc":value="topic.description" />
    <div class="row justify-between">
      <div v-if="proposalTimer !== -1">
        {{ $t('Proposal.time.label') }}
        <p class="text-dark">{{ proposalTimer }}</p>
      </div>
      <div v-if="votingTimer !== -1">
        {{ $t('Voting.time.duration') }}
        <p class="text-dark">{{ votingTimer }}</p>
      </div>  
      <div>
        {{ $t('NegativeScoreWeighting') }}
        <p class="text-dark">{{ negativeScoreWeight }}
          <NegativeScoreInfo/>
        </p>
      </div>
    </div>
    <Share />
  </ProcessCard>
</template>
<script>
  import NegativeScoreInfo from '@/NegativeScoreInfo'
  import ProcessCard from 'layouts/ProcessCard'
  import Share from '@/Share'
  import { QField, QItem, QItemMain } from 'quasar'
  import ULabel from '@/ULabel'

  export default {
    props: {
      topic: { required: true },
      proposalTimer: { required: true },
      votingTimer: { required: true },
      negativeScoreWeight: { required: true }
    },
    components: {
      NegativeScoreInfo,
      ProcessCard,
      Share,
      ULabel,
      QField,
      QItem,
      QItemMain
    },
    data () {
      return {
        votingTimeLabel: this.$t('Voting.time.duration')
      }
    }
  }
</script>
<style lang="stylus" scoped>
.desc
  color grey
</style>
