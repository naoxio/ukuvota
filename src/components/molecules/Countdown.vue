
<script lang="ts" setup>
  import { t } from "i18next";
  import { ref } from 'vue'

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
    day: 0,
    hour: 0,
    minute: 0,
    second: 0
  })

  const hide = () => {
    time.value = {
      day: 0,
      hour: 0,
      minute: 0,
      second: 0
    };
  }

  const countdown = () => {

    let ts = props.dates[0] < +new Date()
      ? (props.dates[1] - +new Date()) / 1000
      : (props.dates[1] - props.dates[0]) / 1000;

    ts = Math.abs(ts);
    let seconds = ts % 60;
    ts = (ts - seconds) / 60;
    let minutes = ts % 60;
    ts = (ts- minutes) / 60;
    let hours = ts % 24;
    ts = (ts - hours) / 24;
    let days = ts;
    // round numbers

    time.value.day = Math.floor(days);
    time.value.hour = Math.floor(hours);
    time.value.minute = Math.floor(minutes);
    time.value.second = Math.floor(seconds);

    if (props.dates[0] < +new Date()) setTimeout(countdown, 1000);

  }


  countdown()

</script>
<template>
    <span :class="{ 'link-warning' : type === 'warning', 'link-alert': type === 'alert', 'link-success': type === 'success' }">
      <span v-for="[k, v] in Object.entries(time)" :id="k">
        <span v-if="v !== 0 && (k !== 'second' || time.day <= 0 && time.hour <= 0)">{{ t(`time.${k}`, {count: v}) }}&nbsp;</span>
      </span>
    </span>
  </template>