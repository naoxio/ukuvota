<script lang="ts" setup>
    import { useStore } from '@nanostores/vue';
    import { process, Process } from 'stores/processStore';
    import { theme } from 'stores/userStore'

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
        if (end < start) [start, end] = [end, start]        
        const v_start = (props.phase === 'voting') ? start : $process.value.votingDates[0]
        process.setKey("proposalVotingGap", v_start - $process.value.proposalDates[1])
        process.setKey(props.phase + 'Duration' as keyof Process, end - start)
        process.setKey(props.phase + 'Dates' as keyof Process, [start, end])
    }
</script>

<template>
    <div class="datetime-picker">
        <Datepicker
        :min-date="props.index === 0 ? $process[props.phase + 'DateMin'] : $process[props.phase + 'Dates'][0]"
        :modelValue="$process[props.phase + 'Dates'][props.index]"
        @update:modelValue="changeDatetime"
        :dark="$theme === 'dark'"
        :clearable="false"
        prevent-min-max-navigation auto-apply
        text-input />
    </div>
</template>

<style>
    .datetime-picker div  {
        width: 100% ;
        max-width: 340px;
        margin: auto;
        border-radius: 0;
    }
    
    .dp__overlay_container>.dp__overlay_row {
        max-width: 70px;
    }
</style>