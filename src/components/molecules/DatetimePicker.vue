<script lang="ts" setup>
import { useStore } from '@nanostores/vue';

import { theme } from 'stores/userStore'

const $theme = useStore(theme)

let proposalDate = new Date()


const changeDatetime = async(datetime) => {

}
</script>

<template>
    <div class="datetime-picker">
        <Datepicker
        class="w-full"
        :min-date="new Date()"
        :value="proposalDate"
        @update:modelValue="changeDatetime"
        :dark="$theme === 'dark'"
        :clearable="false"
        range
        prevent-min-max-navigation auto-apply
        inline text-input inline-with-input/>
    </div>
</template>

<style>
    .datetime-picker div {
        width: 100% ;
        border-radius: 0;
    }
</style>