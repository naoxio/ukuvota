  
<script lang="ts" setup>
    import { t } from 'i18next'
    
    const props = defineProps({
        title: {
            type: String,
            required: true
        },
        timeLeft: {
            type: Object as () => TimeLeft,
            required: true
        }
    })

  
    interface TimeLeft {
        minutes: number
        hours: number
        days: number
    }
</script>
  

<template>
    <div>
      <h3>{{ title }}</h3>
      <div class="flex items-center">
        <p>{{ t('time.minutes') }}: &nbsp;</p>
        <label for="minutes">{{ timeLeft.minutes }}</label>
      </div>
      <input name="minutes" type="range" min="1" max="60" v-model="timeLeft.minutes" class="range" />
      <div class="flex items-center">
        <p>{{ t('time.hours') }}: &nbsp;</p>
        <label for="hours">{{ timeLeft.hours }}</label>
      </div>
      <input name="hours" type="range" min="0" max="24" v-model="timeLeft.hours" class="range" />
      <div class="flex items-center">
        <p>{{ t('time.days') }}: &nbsp;</p>
        <label for="days">{{ timeLeft.days }}</label>
      </div>
      <input name="days" type="range" min="0" max="90" v-model="timeLeft.days" class="range" />
    </div>
  </template>
