<script lang="ts" setup>
  import { t } from 'i18next'
  import { useStore } from '@nanostores/vue';
  import { process, Process } from 'stores/processStore';
  import { fmtDuration } from 'composables/dateHelpers'

  const props = defineProps({
      phase: {
          type: String,
          required: true
      }
  })

  const $process = useStore(process)
  const roundDuration = (duration: number): number => {
    const year = 31557600000;
    const month = 2629800000;
    const day = 86400000;
    const hour = 3600000;
    const minute = 60000;
    const second = 1000;

    switch (true) {
      case (duration >= year):
        return Math.round(duration / month) * month;
      case (duration >= month):
        return Math.round(duration / day) * day;
      case (duration >= day):
        return Math.round(duration / hour) * hour;
      case (duration >= hour):
        return Math.round(duration / minute) * minute;
      case (duration >= minute):
        return Math.round(duration / second) * second;
      default:
        return duration;
    }
  }

  const logslider = (position) => {
    // position will be between 0 and 100
    const minp = 1;
    const maxp = 1000;

    // The result should be between 100 an 10000000
    const minv = Math.log(1);
    const maxv = Math.log(525601);

    // calculate adjustment factor
    const scale = (maxv-minv) / (maxp-minp);

    return Math.floor(Math.exp(minv + scale*(position-minp)));
  }

  const changeTime = (ev: InputEvent & { target: HTMLInputElement}) => {
    const value = Number(ev.target.value)
    process.setKey(`${props.phase}LogSlider` as keyof Process, value)
    let duration = roundDuration(logslider(value) * 1000 * 60)
    process.setKey(`${props.phase}Duration` as keyof Process, duration)
  }
</script>
  

<template>      
    <span>{{ t('duration') }}:&nbsp;</span>
    <span class="text-success">{{ fmtDuration(+new Date() + $process[`${props.phase}Duration`], +new Date()) }}</span>
    <br/>
    <input intervals="" type="range" min="1" max="1000" :value="$process[`${props.phase}LogSlider` as keyof Process]" @input="changeTime" class="range" />
  </template>
