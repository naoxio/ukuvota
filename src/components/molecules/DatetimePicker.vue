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
        const start = +new Date(datetimes[0])
        const end = +new Date(datetimes[1])
        console.log(start, end)
        process.setKey(props.keyValue + 'Start' as keyof Process, start)
        process.setKey(props.keyValue + 'End' as keyof Process, end)
        if (props.keyValue === 'phase1') {
            process.setKey('phase2DateMin', new Date(end).toISOString())
            const phase2Start = $process.value.phase2Start
            const phase2End = $process.value.phase2End
            if (phase2Start < end) {
                const diff = phase2End - phase2Start
                process.setKey('phase2Start', end)
                process.setKey('phase2End', end + diff)
            }
        }
    }
</script>

<template>
    <div class="datetime-picker">
        <Datepicker
        class="w-full"
        :min-date="$process[props.keyValue + 'DateMin']"
        :modelValue="[$process[props.keyValue + 'Start'],$process[props.keyValue + 'End']]"
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