<script lang="ts" setup>
import TimeSlider from '../molecules/TimeSlider.vue'

import { t } from 'i18next';
import { ref } from 'vue'

const props = defineProps({
    phase: String
})
const slideSelector = ref(true)


const proposalTimeLeft = ref({
        minutes: 15,
        hours: 0,
        days: 0
})
const votingTimeLeft = ref({
        minutes: 30,
        hours: 0,
        days: 0
})
</script>
<template>
    <div class="py-2">
        <div class="flex justify-between items-center">
            <h2>{{ t('quick.timeLeftHeading') }}</h2>
            <h2 v-if="false">{{ t('quick.timeLeftVotingHeading') }}</h2>
            <select class="select select-bordered mx-2" @change="slideSelector = !slideSelector">
                <option selected :value="slideSelector">{{ t('quick.timeSelector.slider') }} </option>
                <option :value="slideSelector">{{ t('quick.timeSelector.calendar') }}</option>
            </select>
        </div>
        <div v-if="slideSelector" class="slider">
            <TimeSlider
                :title="t('quick.proposalTime')"
                :timeLeft="proposalTimeLeft"
            />
            <TimeSlider
            :title="t('quick.votingTime')"
            :timeLeft="votingTimeLeft"
                />
        </div>
        <div v-else class="calendar">
        <br>...
        <br>
        </div>
    </div>

  </template>  
