<template>
  <ProcessCard>
    <h5><q-field :label="topic.question" /></h5>
    <q-field :label="topic.description" />
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
        <p class="text-dark">{{ negativeScoreWeightLabel }}
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

  export default {
    props: {
      topic: { required: true },
      proposalTimer: { required: true },
      votingTimeLabel: { required: true },
      votingTimer: { required: true },
      negativeScoreWeightLabel: { required: true }
    },
    components: {
      NegativeScoreInfo,
      ProcessCard,
      Share,
      QField,
      QItem,
      QItemMain
    }
  }
</script>
