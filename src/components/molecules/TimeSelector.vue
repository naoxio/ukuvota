<script lang="ts" setup>
import { useStore } from '@nanostores/vue';
import { process } from 'stores/processStore';
import DatetimePicker from 'molecules/DatetimePicker.vue';
import DatetimeSlider from 'molecules/DatetimeSlider.vue'

import { t } from 'i18next';

const $process = useStore(process)
const props = defineProps({
  phase: {
    type: String,
    required: true
  },
})

</script>
<template>
    <div v-if="$process.phases === 'full' || phase === 'voting'">
        <h2>{{ t(`phases.${phase}.title`) }}</h2>
        <span class="flex justify-between items-center">
            <h3>{{ t(`phases.startAt`) }}:</h3>
            <DatetimePicker :phase="phase" :index="0"/>
            <p/>

        </span>
        <DatetimeSlider :phase="phase"/>
        <span class="flex justify-between items-center">
            <h3>{{ t(`phases.endsAt`) }}:</h3>
            <DatetimePicker :phase="phase" :index="1"/>
            <p/>
        </span>
    </div>
</template>  
