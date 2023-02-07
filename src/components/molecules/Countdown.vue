
<script lang="ts" setup>
  import { t } from 'i18next'
  import { ref } from 'vue'
  import formatDistanceStrict from 'composables/formatDistanceStrict'

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


  countdown()

</script>
<template>
    <span v-if="targetDate > currentDate" :class="{ 'link-warning' : type === 'warning', 'link-alert': type === 'alert', 'link-success': type === 'success' }">
      {{ formatDistanceStrict(targetDate, currentDate) }}
    </span>
    <span v-else class="text-info">{{ t('done') }}</span>
  </template>