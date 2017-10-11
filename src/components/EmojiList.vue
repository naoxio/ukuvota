<template>
  <div>
    <div v-for="(value, proposal) in results" :key="value">
      <q-item :class="{ topProposal: getEmoji(proposal) === 3, highlightTopScores: highlightTopScores && getEmoji(proposal) === 3}">
        <q-item-main :label="proposal" :sublabel="getDescription(proposal)"></q-item-main>
          <q-item-side>
            <img :src="'statics/emo/' + getEmoji(proposal) + '.svg'" height="32px" />
          </q-item-side>
        </q-item-main>
     </q-item>
    </div>
  </div>
</template>

<script>
import { QItem, QItemMain, QItemSide } from 'quasar'

export default {
  props: {
    results: { required: true }
  },
  components: {
    QItem,
    QItemMain,
    QItemSide
  },
  watch: {
    selection (newVal) {
      this.res = {}
      this.$emit('update:options', newVal)
    }
  },
  data () {
    return {
      selection: this.options
    }
  }
}
</script>

<style lang="stylus">

</style>
