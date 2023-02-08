
<script lang="ts" setup>
  import { t } from 'i18next'
  import { ref, computed } from 'vue'
  import { fmtDuration } from 'composables/dateHelpers'

  const props = defineProps({
    dates: {
      type: Number[2],
      required: true
    },
    type: {
      type: String,
      default: ""
    }
  })

  const time = ref({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })


  const targetDate = ref(props.dates[1])
  const currentDate = ref(+new Date())
  const countdown = () => {

    currentDate.value = props.dates[0] < +new Date() ? +new Date() : props.dates[0]

    if (props.dates[0] < +new Date()) setTimeout(countdown, 1000);

  }

  const timeUnits = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds']

  countdown()
  const units = computed(() => {
    const diff = targetDate.value - currentDate.value
    return diff > 86400000 ? timeUnits.filter((v) => v !== 'seconds' && v !== 'minutes' && v !== 'hours') : diff > 3600000 ? timeUnits.filter((v) => v !== 'seconds') : timeUnits
  })

</script>
<template>
    <span v-if="targetDate > currentDate" :class="{ 'link-warning' : (type === 'warning' && (targetDate - currentDate) > 300000), 'text-error': (type === 'warning' && (targetDate - currentDate) <= 300000), 'link-success': type === 'success' }">
      {{ fmtDuration(targetDate, currentDate, units) }}
    </span>
    <span v-else class="text-info">{{ t('done') }}</span>
  </template>