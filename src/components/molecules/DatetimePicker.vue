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
        console.log(datetime, props.phase)
        let start = props.index === 0 ? +new Date(datetime) : $process.value[props.phase + 'Dates'][0]
        let end = props.index === 1 ? +new Date(datetime) : $process.value[props.phase + 'Dates'][1]
        if (end < start) end = start + $process.value[props.phase + 'Duration']
        
        const v_start = (props.phase === 'voting') ? start : $process.value.votingDates[0]
        const gap = v_start - $process.value.proposalDates[1]
        console.log('here')
        if (props.phase === 'voting' && start <= $process.value["proposalDates"][1]) start = $process.value["proposalDates"][1]

        console.log('not here', $process.value["proposalDates"][1], start)
        process.setKey("proposalVotingGap", gap < 0 ? 0 : gap)

        process.setKey(props.phase + 'Duration' as keyof Process, end - start)
        process.setKey(props.phase + 'Dates' as keyof Process, [start, end])
    }
</script>

<template>
    <Datepicker
    @open="process.setKey(props.phase + 'Open' as keyof Process, true)"
    @closed="process.setKey(props.phase + 'Open' as keyof Process, false)"
    :min-date="props.index === 0 ? $process[props.phase + 'DateMin'] : new Date($process[props.phase + 'Dates'][0]).toLocaleString()"
    :modelValue="$process[props.phase + 'Dates'][props.index]"
    @update:modelValue="changeDatetime"
    :dark="$theme === 'dark'"
    :clearable="false"
    :format-locale="getDateLocale()"
    prevent-min-max-navigation
    text-input 
    :cancelText="t('cancel')" :selectText="t('select')"/>
</template>

<style>

    
</style>