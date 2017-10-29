<template>
  <div>
    <div class="row justify-center">
      <div class="info">
        <ULabel :value="durationLabel" />
        <ULabel class="sublabel" :value="duration" />
      </div>
      <div class="info">
        <ULabel :value="untilLabel" />
        <ULabel class="sublabel" :value="date" />
      </div>
    </div>
    <div class="row justify-between">
      <q-btn flat> + 1 day</q-btn>
      <q-btn flat> + 3 days</q-btn>
      <q-btn flat> + 1 hour</q-btn>
        <q-icon color="primary" class="icon" name="today">
        <q-popover ref="popover">
          <q-inline-datetime :min="min" v-model="deadline" :type="type">
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
      deadline (val) { this.$store.dispatch(this.updDeadline + 'Sync', val) }
    },
    computed: {
      date () { return this.$store.getters[this.getDeadlineFormatted] },
      duration () { return this.$store.getters[this.getDuration] }
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
        deadline: this.$store.getters['get' + this.store + 'Deadline'],
        updDeadline: 'update' + this.store + 'Deadline',
        getDeadlineFormatted: 'get' + this.store + 'DeadlineFormatted',
        getDuration: 'get' + this.store + 'Duration',
        getDeadline: 'get' + this.store + 'Deadline'
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .sublabel
    color grey
  .info
    padding 1em
    text-align center
    cursor default
  .icon
    cursor pointer
    font-size 1.5em
</style>
