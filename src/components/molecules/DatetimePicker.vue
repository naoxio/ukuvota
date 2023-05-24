<script lang="ts" setup>
    import { t } from 'i18next'
    import { useStore } from '@nanostores/vue';
    import { process, Process } from 'stores/processStore';
    import { theme } from 'stores/userStore'
    import getDateLocale from 'composables/getDateLocale'
    const props = defineProps({
        index: {
            type: Number,
            required: true
        },
        phase: {
            type: String,
            required: true
        }
    })

    const $process = useStore(process)
    const $theme = useStore(theme)

    const changeDatetime = async(datetime: string) => {
        let start = props.index === 0 ? +new Date(datetime) : $process.value[props.phase + 'Dates'][0]
        let end = props.index === 1 ? +new Date(datetime) : $process.value[props.phase + 'Dates'][1]
        if (end < start) end = start + $process.value[props.phase + 'Duration']
        
        const v_start = (props.phase === 'voting') ? start : $process.value.votingDates[0]
        const gap = v_start - $process.value.proposalDates[1]
        if ($process.value.phases === 'full' && props.phase === 'voting' && start <= $process.value["proposalDates"][1]) start = $process.value["proposalDates"][1]

        process.setKey("proposalVotingGap", gap < 0 ? 0 : gap)

        process.setKey(props.phase + 'Duration' as keyof Process, end - start)
        process.setKey(props.phase + 'Dates' as keyof Process, [start, end])
    }
</script>

<template>
    <div class="flex justify-center items-center">
        <Datepicker
        @open="process.setKey(props.phase + 'Open' as keyof Process, props.index + 1)"
        @closed="process.setKey(props.phase + 'Open' as keyof Process, 0)"
        :min-date="props.index === 0 ? $process[props.phase + 'DateMin'] : new Date($process[props.phase + 'Dates'][0]).toLocaleString()"
        :modelValue="$process[props.phase + 'Dates'][props.index]"
        @update:modelValue="changeDatetime"
        :dark="$theme === 'dark'"
        :clearable="false"
        :format-locale="getDateLocale()"
        prevent-min-max-navigation
        text-input
        :teleport="`#cal-${props.phase}-${props.index}`"
        :cancelText="t('cancel')" :selectText="t('select')"/>
    </div>
    <br/>
    <div class="calendar" :id="`cal-${props.phase}-${props.index}`"  :class="{'open': $process[props.phase + 'Open'] === props.index + 1 }"/>  
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