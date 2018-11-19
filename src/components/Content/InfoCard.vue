<template>
  <UCard>
    <h5><ULabel :value="topic.question" /></h5>
    <UserMarkdown v-if="topic.description" class="desc" :source="topic.description" />
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
  </UCard>
</template>
<script>
  import NegativeScoreInfo from '@/Modal/NegativeScore'
  import UCard from '@/General/UCard'
  import Share from '@/Content/Share'
  import { QField, QItem, QItemMain } from 'quasar'
  import ULabel from '@/General/ULabel'
  import UserMarkdown from '@/General/UserMarkdown'

  export default {
    props: {
      topic: { required: true },
      proposalTimer: { required: true },
      votingTimer: { required: true },
      negativeScoreWeight: { required: true }
    },
    components: {
      NegativeScoreInfo,
      UserMarkdown,
      UCard,
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
.desc >>> *:not(a)
  color grey
</style>
