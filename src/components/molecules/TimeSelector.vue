<script lang="ts" setup>
import { useStore } from '@nanostores/vue';
import { process } from 'stores/processStore';
import DatetimePicker from 'molecules/DatetimePicker.vue';
import DatetimeSlider from 'molecules/DatetimeSlider.vue'
import { ref } from 'vue'
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
        <div class="calendar" :id="`cal-${props.phase}-0`" :class="{'open': $process[props.phase + 'Open'] === 1 }"/>
        <span class="flex justify-between items-center">
            <h3>{{ t(`phases.endsAt`) }}:</h3>

            <DatetimePicker :phase="phase" :index="1"/>
            <p/>
        </span>
        <div class="calendar" :id="`cal-${props.phase}-1`"  :class="{'open': $process[props.phase + 'Open'] === 2 }"/>
        <DatetimeSlider :phase="phase"/>

    </div>
</template>  


<style>
.size {
  height: 500px;
}
.calendar {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 0;
    transition: all 1s ease-in-out;
    overflow: hidden;

}
.calendar.open {
  height: 400px;
  transition: all 1s ease-in-out;

}
.calendar .dp__menu {
    position: relative;
    left: 0 !important;
    top: 0 !important;
    transform: none !important;
}
</style>