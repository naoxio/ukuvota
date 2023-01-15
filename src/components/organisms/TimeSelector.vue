<script lang="ts" setup>
import TimeSlider from 'molecules/TimeSlider.vue'
import { useStore } from '@nanostores/vue';
import { process } from 'stores/processStore';
import { t } from 'i18next';
import DatetimePicker from 'molecules/DatetimePicker.vue'

const $process = useStore(process)
const toggleTimeSelector = () => {
    const newValue = $process.value.timeSelector === 'slider' ? 'calendar' : 'slider';
    process.setKey('timeSelector', newValue)
}

const testDate = [new Date().toISOString(), new Date().toISOString()]
</script>
<template>
    <div class="py-2">
        <div class="flex justify-between items-center flex-wrap">
            <h2 v-if="$process.phases === 'full'">{{ t('process.timeLeftHeading') }}</h2>
            <h2 v-if="$process.phases === 'voting'">{{ t('process.timeLeftVotingHeading') }}</h2>
            <select class="select select-bordered mx-2" @change="toggleTimeSelector">
                <option :selected="$process.timeSelector === 'slider'" :value="$process.timeSelector">{{ t('process.timeSelector.slider') }} </option>
                <option :selected="$process.timeSelector === 'calendar'" :value="$process.timeSelector">{{ t('process.timeSelector.calendar') }}</option>
            </select>
        </div>
        <div v-if="$process.timeSelector === 'slider'" class="slider">
            <TimeSlider
                v-if="$process.phases === 'full'"
                :title="t('process.proposalTime')"
                keyValue="proposalTime"
            />
            <TimeSlider
                :title="t('process.votingTime')"
                keyValue="votingTime"
                />
        </div>

        <div v-if="$process.timeSelector === 'calendar'" class="calendar">
            <div v-if="$process.phases === 'full'">
                <h3>{{ t('process.proposalTimeRange')}}</h3>
               <DatetimePicker keyValue="proposal" />
            </div>
            <br/>
            <h3>{{ t('process.votingTimeRange')}}</h3>
            <DatetimePicker keyValue="voting" />

            <br/>
        </div>
    </div>
</template>  

<style>
</style>