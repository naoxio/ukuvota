  
<script lang="ts" setup>
  import { t } from 'i18next'
  import { useStore } from '@nanostores/vue';
  import { process, Process } from 'stores/processStore';

  const props = defineProps({
      keyValue: {
          type: String,
          required: true
      }
  })

  const $process = useStore(process)

  const convertToTime = (unit: string, milliseconds: number) => {
    switch (unit) {
      case 'days':
        return Math.floor(milliseconds / 86400000)
      case 'hours':
        return Math.floor(milliseconds / 3600000) % 24
      case 'minutes':
        return Math.floor(milliseconds / 60000) % 60
    }
  }
  const getMilliseconds = (days: number, hours: number, minutes: number) => {
    return ((days * 24 + hours) * 60 + minutes) * 60 * 1000
  }

const changeTime = (ev: InputEvent & { target: HTMLInputElement}) => {
  const val = Number(ev.target.value)
  const timeLeft = $process.value[props.keyValue];

  let days = convertToTime('days', timeLeft)
  let hours = convertToTime('hours', timeLeft)
  let minutes = convertToTime('minutes', timeLeft)
  switch (ev.target.name) {
    case 'days':
      days = val
      break
    case 'hours':
      hours = val
      break
    case 'minutes':
      minutes = val
      break
  }
  const ms = getMilliseconds(days, hours, minutes)
  process.setKey(props.keyValue as keyof Process, ms)
}

</script>
  

<template>
    <div>
      <div class="flex items-center">
        <p>{{ t('time.minutes') }}: &nbsp;</p>
        <label for="minutes">{{ convertToTime('minutes', $process[keyValue]) }}</label>
      </div>
      <input name="minutes" type="range" min="1" max="59" :value="convertToTime('minutes', $process[keyValue])" @input="changeTime" class="range" />
      <div class="flex items-center">
        <p>{{ t('time.hours') }}: &nbsp;</p>
        <label for="hours">{{ convertToTime('hours', $process[keyValue]) }}</label>
      </div>
      <input name="hours" type="range" min="0" max="23" :value="convertToTime('hours', $process[keyValue])" @input="changeTime" class="range" />
      <div class="flex items-center">
        <p>{{ t('time.days') }}: &nbsp;</p>
        <label for="days">{{ convertToTime('days', $process[keyValue]) }}</label>
      </div>
      <input name="days" type="range" min="0" max="90" :value="convertToTime('days', $process[keyValue])" @input="changeTime" class="range" />
    </div>
  </template>
