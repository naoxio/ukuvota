<script lang="ts" setup>
import TimeSlider from 'molecules/TimeSlider.vue'
import { useStore } from '@nanostores/vue';
import { process, Process } from 'stores/processStore';
import { t } from 'i18next';
import DatetimePicker from 'molecules/DatetimePicker.vue'
import { format} from 'date-fns'
const $process = useStore(process)
const changeSelector = (ev) => {
    if (ev.target.name) {
        process.setKey('votingSelector', ev.target.name)
        process.setKey('proposalSelector', ev.target.name)
    }
}

const isActiveTab = (selector: string) => {
    return $process.value.proposalSelector === selector ? "tab-active" : ""
}
</script>
<template>
    <div class="py-2">
        <div class="flex justify-between items-center flex-wrap">
            <h2 v-if="$process.phases === 'full'">{{ t('process.timeLeftHeading') }}</h2>
            <h2 v-if="$process.phases === 'voting'">{{ t('process.timeLeftVotingHeading') }}</h2>
        </div>
        <div class="tabs" @click="(ev) => changeSelector(ev)">
            <a name="slider" class="tab tab-bordered" :class="isActiveTab('slider')">Slider</a> 
            <a name="calendar" class="tab tab-bordered" :class="isActiveTab('calendar')">Calendar</a> 
        </div>
        <div v-if="$process.phases === 'full'">
            <h2>{{ t('process.proposalPhase.title') }}</h2>

            <div v-if="$process.proposalSelector === 'slider'" >
                <span>
                    <h3>{{ t('process.proposalPhase.startAt') }}</h3>
                    <p>{{ format(new Date($process.proposalDates[0]), 'E MMM d y hh:mm zzzz') }}</p>
                </span>
                
                <TimeSlider
                    keyValue="proposalDuration"
                />
            </div>
            <div v-if="$process.proposalSelector === 'calendar'">
                <h3>{{ t('process.proposalPhase.timeRange')}}</h3>
                <DatetimePicker keyValue="proposal" />
            </div>
        </div>
        <div>
            <h2>{{ t('process.votingPhase.title') }}</h2>

            <div v-if="$process.votingSelector === 'slider'" >
                <span>
                    <h3>{{ t('process.votingPhase.startAt') }}</h3>
                    <p>{{ format(new Date($process.votingDates[0]), 'E MMM d y hh:mm zzzz') }}</p>
                </span>
                <TimeSlider
                    keyValue="votingDuration"
                    />
            </div>
            <div v-if="$process.votingSelector === 'calendar'">
                <h3>{{ t('process.votingPhase.timeRange')}}</h3>
                <DatetimePicker keyValue="voting" />
            </div>

        </div>
    </div>
</template>  
