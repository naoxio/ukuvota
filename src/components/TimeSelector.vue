<template>
  <div>
    <p class="caption row justify-between">
      {{ label }}
      <q-chip>
        {{ $t('Time.Days') }}: {{days}} {{ $t('Time.Hours') }}: {{hours}} {{ $t('Time.Minutes') }}: {{minutes}}
      </q-chip>
    </p>

    <q-slider :step="1" v-model="days" :min="0" :max="62" snap/>
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
  data () {
    let { days, hours, minutes } = this.value
    return {
      days,
      hours,
      minutes
    }
  }
}
</script>

<style></style>
