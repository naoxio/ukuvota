<script lang="ts" setup>
import TimeSlider from 'atoms/TimeSlider.vue'
import { useStore } from '@nanostores/vue';
import { quickPhases, Phases, slideSelector } from 'stores/quickStore';
import { theme } from 'stores/userStore'

import { t } from 'i18next';
import { ref, computed} from 'vue'

const $theme = useStore(theme)
const $slideSelector = useStore(slideSelector)


const proposalTimeLeft = ref({
        minutes: 15,
        hours: 0,
        days: 2
})
const votingTimeLeft = ref({
        minutes: 15,
        hours: 0,
        days: 2
})

const $quickPhases = useStore(quickPhases);

let date = new Date();
let isoString = date.toISOString();

let today = isoString.slice(0, isoString.length - 8);
console.log(date.toLocaleString('en-US', {timeZone: 'Asia/Bangkok'}));
const proposalDatetime = +new Date() + 20000


</script>
<template>
    <div class="py-2">
        <div class="flex justify-between items-center flex-wrap">
            <h2 v-if="$quickPhases === Phases.Full">{{ t('quick.timeLeftHeading') }}</h2>
            <h2 v-if="$quickPhases === Phases.Voting">{{ t('quick.timeLeftVotingHeading') }}</h2>
            <select class="select select-bordered mx-2" @change="slideSelector.set(!$slideSelector)">
                <option selected :value="$slideSelector">{{ t('quick.timeSelector.slider') }} </option>
                <option :value="$slideSelector">{{ t('quick.timeSelector.calendar') }}</option>
            </select>
        </div>
        <div v-if="$slideSelector" class="slider">
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
            <br/>
            <div v-if="$quickPhases === Phases.Full">
                <h3>{{ t('quick.proposalTime')}}</h3>
                <Datepicker v-model="date" :dark="$theme === 'dark'"></Datepicker>
            </div>
            <br/>
            <h3>{{ t('quick.votingTime')}}</h3>
            <Datepicker v-model="date" :dark="$theme === 'dark'"></Datepicker>
            <br/>
        </div>
    </div>
</template>  
