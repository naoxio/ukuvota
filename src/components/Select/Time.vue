<template>
  <div>
    <q-datetime v-model="date" :min="min" type="datetime" />

    <div class="caption row justify-center" style="text-align: center">
      <div class="col" style="text-align: left">
        {{ label }}
      </div>
      <q-chip>
        {{ $t('Time.Days') }}: {{days}} {{ $t('Time.Hours') }}: {{hours}} {{ $t('Time.Minutes') }}: {{minutes}}
      </q-chip>
    </div>

    <q-slider :step="1" v-model="days" :min="0" :max="31" snap/>
    <q-slider :step="1" v-model="hours" :min="0" :max="23" snap/>
    <q-slider :step="1" v-model="minutes" :min="1" :max="59" snap/>
  </div>
</template>

<script>
import {
  QCheckbox,
  QChip,
  QField,
  QSelect,
  QSlider,
  QDatetime
} from 'quasar'

export default {
  props: {
    label: { required: true },
    value: { required: true },
    min: Date
  },
  components: {
    QCheckbox,
    QChip,
    QField,
    QSelect,
    QSlider,
    QDatetime
  },
  watch: {
    days (val) {
      this.value.days = val
    },
    hours (val) {
      this.value.hours = val
    },
    minutes (val) {
      this.value.minutes = val
    }
  },
  data () {
    let { days, hours, minutes } = this.value
    return {
      days,
      hours,
      minutes,
      date: '2018-10-24T10:40:14.674Z'
    }
  }
}
</script>

<style lang="stylus">

</style>
