<template>
  <div style="padding: 2em">
    <p class="caption row justify-between">
      {{ label }}
      <q-chip v-if="slider">
        {{ $t('Time.Days') }}: {{days}} {{ $t('Time.Hours') }}: {{hours}} {{ $t('Time.Minutes') }}: {{minutes}}
      </q-chip>
      <q-checkbox style="text-align: right" label="Slider" v-model="slider" />
    </p>

    <div v-if="slider">
      <q-slider :step="1" v-model="days" :min="0" :max="62" snap/>
      <q-slider :step="1" v-model="hours" :min="0" :max="23" snap/>
      <q-slider :step="1" v-model="minutes" :min="0" :max="59" snap/>
    </div>
    <div v-else class="row">
      <q-select
        radio
        class="col-4"
        :float-label="$t('Time.Days')"
        v-model="days"
        :options="selectDays"
      />
      <q-select
        radio
        class="col-4"
        :float-label="$t('Time.Hours')"
        v-model="hours"
        :options="selectHours" 
      />
      <q-select
        radio
        class="col-4"
        :float-label="$t('Time.Minutes')"
        v-model="minutes"
        :options="selectMinutes"
      />
    </div>
  </div>
</template>

<script>
import {
  QCheckbox,
  QChip,
  QField,
  QSelect,
  QSlider
} from 'quasar'

export default {
  props: {
    label: { required: true },
    value: { required: true }
  },
  components: {
    QCheckbox,
    QChip,
    QField,
    QSelect,
    QSlider
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
  methods: {
    genSelectValues (recursion) {
      let values = []
      let val = 0
      while (val < recursion) {
        values.push({label: '' + val, value: val})
        let incr = 1
        if (val > 1) incr = values[values.length - 2].value
        val = val + incr
      }
      return values
    }
  },
  data () {
    let { days, hours, minutes } = this.value
    return {
      days,
      hours,
      minutes,
      slider: false,
      selectMinutes: this.genSelectValues(60),
      selectHours: this.genSelectValues(24),
      selectDays: this.genSelectValues(365)
    }
  }
}
</script>

<style></style>
