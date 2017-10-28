<template>
  <div>
    <q-select :float-label="$t('Date.Day')" v-model="selectedDay" :options="days"/>
    <q-select :float-label="$t('Date.Month')" v-model="selectedMonth" :options="months"/>
    <q-input :stack-label="label" v-model="date" :value="date">
      <q-icon name="today">
        <q-popover ref="popover">
          <q-inline-datetime :min="min" v-model="value" :type="type">
            <q-btn @click="$refs.popover.close()">
              {{ $t('Close') }}
            </q-btn>
          </q-inline-datetime>
        </q-popover>
      </q-icon>
    </q-input>
  </div>
</template>

<script>
  import { QBtn, QPopover, QIcon, QInput, QInlineDatetime, QSelect } from 'quasar'
  export default {
    props: {
      type: String,
      min: Date,
      store: { required: true },
      label: String
    },
    watch: {
      date (val) { this.value = this.$store.getters[this.getFnc] },
      value (val) { this.$store.dispatch(this.updFnc, val) }
    },
    computed: {
      date () { return this.$store.getters[this.getFormatted] },
      months () {
        let months = []
      },
      days () {

      }
    },
    components: {
      QBtn,
      QPopover,
      QIcon,
      QInlineDatetime,
      QInput,
      QSelect
    },
    data () {
      return {
        value: this.$store.getters['get' + this.store],
        updFnc: 'update' + this.store,
        getFormatted: 'get' + this.store + 'Formatted',
        getFnc: 'get' + this.store,
        selectedMonth: 'Nov',
        months: [
          { label: this.$t('Month.Jan'), value: 1 },
          { label: this.$t('Month.Feb'), value: 2 },
          { label: this.$t('Month.Mar'), value: 3 },
          { label: this.$t('Month.Apr'), value: 4 },
          { label: this.$t('Month.May'), value: 5 },
          { label: this.$t('Month.Jun'), value: 6 },
          { label: this.$t('Month.Jul'), value: 7 },
          { label: this.$t('Month.Aug'), value: 8 },
          { label: this.$t('Month.Sep'), value: 9 },
          { label: this.$t('Month.Oct'), value: 10 },
          { label: this.$t('Month.Nov'), value: 11 },
          { label: this.$t('Month.Dec'), value: 12 }
        ]
      }
    }
  }
</script>
<style lang="stylus" scoped>

</style>
