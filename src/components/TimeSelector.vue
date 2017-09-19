<template>
  <div style="padding: 2em">
    <p class="caption row justify-between">
      {{ label }}
      <q-chip>
        {{ $t('Time.Days') }}: {{days}} {{ $t('Time.Hours') }}: {{hours}} {{ $t('Time.Minutes') }}: {{minutes}}
      </q-chip>
    </p>
    <q-slider :step="1" v-model="days" :min="0" :max="62" snap/>
    <q-slider :step="1" v-model="hours" :min="0" :max="23" snap/>
    <q-slider :step="1" v-model="minutes" :min="1" :max="59" snap/>
  
    <!--div class="row">
      <q-select
        radio
        class="col-4"
        float-label="Days"
        v-model="proposalDaySelect"
        :options="proposalDays"
      />
      <q-select
        radio
        class="col-4"
        float-label="Hours"
        v-model="proposalHourSelect"
        :options="proposalHours"
      />
      <q-select
        radio
        class="col-4"
        float-label="Minutes"
        v-model="proposalMinuteSelect"
       :options="proposalMinutes"
      />
    </div -->
  </div>
</template>

<script>
import {
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
    return { days, hours, minutes }
  }
}
</script>

<style></style>
