<script lang="ts" setup>
    import { useStore } from '@nanostores/vue';
    import { process, Process } from 'stores/processStore';
    import { theme } from 'stores/userStore'

    const props = defineProps({
        keyValue: {
            type: String,
            required: true
        }
    })

    const $process = useStore(process)
    const $theme = useStore(theme)

    const changeDatetime = async(datetimes: string[]) => {
        let start = +new Date(datetimes[0])
        let end = +new Date(datetimes[1])
        if (end < start) {
            [start, end] = [end, start]
        }
        const v_start = (props.keyValue === 'voting') ? start : $process.value.votingDateRange[0]
        process.setKey("proposalVotingGap", v_start - $process.value.proposalDateRange[1])
        process.setKey(props.keyValue + 'Duration' as keyof Process, end - start)
        process.setKey(props.keyValue + 'DateRange' as keyof Process, [start, end])
    }

  
</script>

<template>
    <div class="datetime-picker">
        <Datepicker
        class="w-full"
        :min-date="$process[props.keyValue + 'DateMin']"
        :modelValue="$process[props.keyValue + 'DateRange']"
        @update:modelValue="changeDatetime"
        :dark="$theme === 'dark'"
        :clearable="false"
        range prevent-min-max-navigation auto-apply
        inline text-input inline-with-input/>
    </div>
</template>

<style>
    .datetime-picker div {
        width: 100% ;
        max-width: 420px;
        margin: auto;
        border-radius: 0;
    }
</style>