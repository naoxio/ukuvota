<script lang="ts" setup>
  import { t } from 'i18next'
  import { useStore } from '@nanostores/vue';
  import { process, Process } from 'stores/processStore';
  import { fmtDuration } from 'composables/dateHelpers'
  import logslider from 'composables/logslider';
  
  const props = defineProps({
      phase: {
          type: String,
          required: true
      }
  })

  const $process = useStore(process)
  

  const changeTime = (ev: InputEvent & { target: HTMLInputElement}) => {
    const value = Number(ev.target.value)
    process.setKey(`${props.phase}LogSlider` as keyof Process, value)
    let duration = logslider(value)
    process.setKey(`${props.phase}Duration` as keyof Process, duration)
  }
</script>
  

<template>      
    <span>{{ t('duration') }}:&nbsp;</span>
    <span class="text-success">{{ fmtDuration(+new Date() + $process[`${props.phase}Duration`], +new Date()) }}</span>
    <br/>
    <input intervals="" type="range" min="1" max="1000" :value="$process[`${props.phase}LogSlider` as keyof Process]" @input="changeTime" class="range" />
  </template>
