<template>
  <div class="row">
    <q-select class="col-11" v-model="value" :float-label="$t('NegativeScoreWeighting')" :options="options" />
    <NegativeScoreInfo style="margin: auto; text-align: center" />
  </div>
</template>
<script>
  import NegativeScoreInfo from '@/NegativeScoreInfo'
  import { QSelect } from 'quasar'

  export default {
    props: {
      'negativeScoreWeight': { required: true }
    },
    components: {
      NegativeScoreInfo,
      QSelect
    },
    watch: {
      value (newVal) {
        this.$emit('update:negativeScoreWeight', newVal)
      }
    },
    data () {
      return {
        value: this.negativeScoreWeight,
        options: [{
          label: 'x1',
          value: 1
        },
        {
          label: 'x2',
          value: 2
        },
        {
          label: 'x3',
          value: 3
        },
        {
          label: 'x4',
          value: 4
        },
        {
          label: 'x5',
          value: 5
        },
        {
          label: 'x6',
          value: 6
        },
        {
          label: 'x7',
          value: 7
        },
        {
          label: 'x8',
          value: 8
        },
        {
          label: '∞ (' + this.$t('SystemicConsensus') + ')',
          value: 'infinity'
        }
        ]
      }
    }
  }
</script>
