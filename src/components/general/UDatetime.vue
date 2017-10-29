<template>
  <div>
    <div class="row justify-center">
      <div class="pad">
        <ULabel :value="untilLabel" />
        <ULabel class="sublabel" :value="date" />
      </div>
      <div class="pad">
        <ULabel :value="durationLabel" />
        <ULabel class="sublabel" :value="date" />
      </div>
    </div>
    <div>
      <q-icon name="today">
        <q-popover ref="popover">
          <q-inline-datetime :min="min" v-model="value" :type="type">
            <q-btn @click="$refs.popover.close()">
              {{ $t('Close') }}
            </q-btn>
          </q-inline-datetime>
        </q-popover>
      </q-icon>
     </div>
  </div>
</template>

<script>
  import { QBtn, QPopover, QIcon, QInput, QInlineDatetime, QSelect, QItem, QItemMain, QItemSide } from 'quasar'
  import ULabel from './ULabel'
  export default {
    props: {
      type: String,
      min: Date,
      store: { required: true },
      untilLabel: String,
      durationLabel: String
    },
    watch: {
      date (val) { this.value = this.$store.getters[this.getFnc] },
      value (val) { this.$store.dispatch(this.updFnc + 'Sync', val) }
    },
    computed: {
      date () { return this.$store.getters[this.getFormatted] }
    },
    components: {
      QBtn,
      QPopover,
      QIcon,
      QInlineDatetime,
      QInput,
      QSelect,
      QItem,
      QItemMain,
      QItemSide,
      ULabel
    },
    data () {
      return {
        value: this.$store.getters['get' + this.store],
        updFnc: 'update' + this.store,
        getFormatted: 'get' + this.store + 'Formatted',
        getFnc: 'get' + this.store,
        selectedMonth: 11
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .sublabel
    color grey
  .pad
    padding 1em
</style>
