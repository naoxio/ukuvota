<script lang="ts" setup>
import TimeSlider from 'molecules/TimeSlider.vue'
import { useStore } from '@nanostores/vue';
import { process } from 'stores/processStore';
import DatetimePicker from 'molecules/DatetimePicker.vue';

import { t } from 'i18next';
import { format} from 'date-fns'
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
        <h2>{{ t(`process.${phase}Phase.title`) }}</h2>
        <div v-if="$process.slideSelector" >
            <span>
                <h3>{{ t(`process.${phase}Phase.startAt`) }}</h3>
                <p>{{ format(new Date($process[`${phase}Dates`][0]), 'E MMM d y hh:mm zzzz') }}</p>
            </span>
            <TimeSlider :phase="phase"/>
        </div>
        <div v-else>
            <h3>{{ t(`process.${phase}Phase.timeRange`)}}</h3>
            <DatetimePicker :phase="phase"/>
        </div>
    </div>
</template>  
