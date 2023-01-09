<script lang="ts" setup>
import TimeSlider from '../molecules/TimeSlider.vue'
import { useStore } from '@nanostores/vue';
import { quickPhases, Phases } from '../../stores/quickStore';
import { t } from 'i18next';
import { ref } from 'vue'


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

const $quickPhases = useStore(quickPhases);

</script>
<template>
    <div class="py-2">
        <div class="flex justify-between items-center">
            <h2 v-if="$quickPhases === Phases.Full">{{ t('quick.timeLeftHeading') }}</h2>
            <h2 v-if="$quickPhases === Phases.Voting">{{ t('quick.timeLeftVotingHeading') }}</h2>
            <select class="select select-bordered mx-2" @change="slideSelector = !slideSelector">
                <option selected :value="slideSelector">{{ t('quick.timeSelector.slider') }} </option>
                <option :value="slideSelector">{{ t('quick.timeSelector.calendar') }}</option>
            </select>
        </div>
        <div v-if="slideSelector" class="slider">
            <TimeSlider
                v-if="$quickPhases === Phases.Full"
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
