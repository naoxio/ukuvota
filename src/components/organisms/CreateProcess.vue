<script lang="ts" setup>
import { t } from 'i18next';
import { useStore } from '@nanostores/vue';
import { quickPhases, Phases, topicQuestion, topicDescription, weighting, defaultProposals } from '../../stores/quickStore';
import weightingOptions from "composables/weightingOptions";
import TimeSelector from "molecules/TimeSelector.vue"

const $weighting = useStore(weighting) 
const $quickPhases = useStore(quickPhases);
const $defaultProposals = useStore(defaultProposals);
</script>

<template>
  <div class="pb-6">
    <div>
      <p>{{ t('quick.topic') }}</p>
      <input name="topicQuestion" class="input input-bordered w-full" @input="(e: any) => topicQuestion.set(e.target.value)" type="text">
      <br>
      <p>{{ t('quick.description') }}</p>
      <textarea name="topicDescription" class="textarea textarea-bordered w-full"  @input="(e: any) => topicDescription.set(e.target.value)" />
      <br><br>
      <span>{{ t('quick.weighting') }}</span>
      <span class="flex justify-center items-center">
        <select name="weighting" class="select mx-2 select-bordered mt-2" :value="$weighting" @change="(e: any) => weighting.set(e.target.value)">
          <option v-for="weight in weightingOptions" :value="weight.value">
            <span v-if="Number(weight.value) > 0"> {{ weight.label }}</span>
            <span v-else>&infin;</span>
          </option>
        </select>
      </span>
    </div>
    <h2>{{ t('quick.phases.select') }}</h2>
    <div class="flex justify-around">
      <div class="flex items-center">
        <input id="full-phase" type="radio" name="phase-radio" ref="phase" class="radio radio-primary" @click="quickPhases.set(Phases.Full)" checked/>
        <label for="full-phase" class="mx-2 cursor-pointer	" >{{ t('quick.phases.full') }}</label>
      </div>
      <div class="flex items-center">
        <input id="voting-phase" type="radio" name="phase-radio" class="radio radio-primary"  @click="quickPhases.set(Phases.Voting)"  />
        <label for="voting-phase" class="mx-2 cursor-pointer	">{{ t('quick.phases.voting') }}</label>
      </div>
    </div>
  </div>
  <hr/>
  <TimeSelector/>

  <div v-if="$quickPhases === Phases.Voting">
    <hr class="mt-4"/>
    <h2 class="pt-2">{{ t('quick.proposals') }}</h2>
  </div>
  <div v-if="$quickPhases === Phases.Full">

      <div class="flex justify-center items-center">
          <input name="defaultProposals" type="checkbox" :checked="$defaultProposals" class="checkbox" />

          <span>&nbsp;{{ t('quick.addDefaultProposals') }}</span>
          <!--Modal id="defaultProposalInfo">
              <h3>{{ t('quick.defaultProposals') }}</h3>
              <ContentDoc file_name="DefaultProposals"/>
          </Modal-->
      </div>
  </div>
  <div class="flex justify-around align-center items-center">
    
      <div v-if="$quickPhases === Phases.Voting" class="proposal bg-base-100 card shadow-xl py-4 px-4 my-2 w-full">
          <div class="flex flex-col w-full ">
              <b>{{ t('quick.proposal') }}</b>
              <input type="text" class="input input-bordered input-sm my-2 w-full"/>
              <label>{{ t('quick.description') }}</label>
              <input type="text" class="input input-bordered input-sm my-2 w-full"/>
          </div>
      </div>
  </div>
  <div v-if="$quickPhases === Phases.Voting" align="center">

      <button id="add-proposal" class="btn p-2" >
          {{ t('addProposal') }}
      </button>
  </div>
</template>