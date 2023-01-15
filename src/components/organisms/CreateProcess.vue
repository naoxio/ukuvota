<script lang="ts" setup>
import { t } from 'i18next';
import { process } from '../../stores/processStore';

import TimeSelector from "organisms/TimeSelector.vue"
import WeightSelector from "molecules/WeightSelector.vue"
import { useStore } from '@nanostores/vue';
import Modal from "molecules/Modal.vue";
import ContentDoc from "atoms/ContentDoc.vue"

const $process = useStore(process)

const toggleDefaultProposals = (ev: any) => {
    process.setKey('defaultProposals', ev.target.checked)
}

console.log($process.value.defaultProposals)
</script>

<template>
  <div class="pb-6">
    <div>
      <p>{{ t('process.topic') }}</p>
      <input name="topicQuestion" class="input input-bordered w-full" :value="$process.title" @input="(e: any) => process.setKey('title', e.target.value)" type="text">
      <br>
      <p>{{ t('process.description') }}</p>
      <textarea name="topicDescription" class="textarea textarea-bordered w-full" :value="$process.description" @input="(e: any) => process.setKey('description', e.target.value)" />
      <br><br>
      <WeightSelector/>
    </div>
    <h2>{{ t('process.phases.select') }}</h2>
    <div class="flex justify-around">
      <div class="flex items-center">
        <input id="full-phase" type="radio" name="phase-radio" ref="phase" class="radio radio-primary" @click="process.setKey('phases', 'full')" :checked="$process.phases === 'full'"/>
        <label for="full-phase" class="mx-2 cursor-pointer	" >{{ t('process.phases.full') }}</label>
      </div>
      <div class="flex items-center">
        <input id="voting-phase" type="radio" name="phase-radio" class="radio radio-primary"  @click="process.setKey('phases', 'voting')"  :checked="$process.phases === 'voting'"/>
        <label for="voting-phase" class="mx-2 cursor-pointer	">{{ t('process.phases.voting') }}</label>
      </div>
    </div>
  </div>
  <hr/>
  <TimeSelector/>

  <div v-if="$process.phases === 'voting'">
    <hr class="mt-4"/>
    <h2 class="pt-2">{{ t('process.proposals') }}</h2>
  </div>
  <div v-if="$process.phases === 'full'">
      <div class="flex justify-center items-center">
          <input id="default-proposals" name="default-proposals" type="checkbox" :checked="$process.defaultProposals === 'true'" :value="$process.defaultProposals" @input="toggleDefaultProposals" class="checkbox" />
          <label for="default-proposals" class="cursor-pointer">&nbsp;{{ t('process.addDefaultProposals') }}</label>
          <Modal id="defaultProposalInfo">
              <h3>{{ t('process.defaultProposals') }}</h3>
              <ContentDoc file_name="DefaultProposals"/>
          </Modal>
      </div>
  </div>
  <div class="flex justify-around align-center items-center">
      <div v-if="$process.phases === 'voting'" class="proposal bg-base-100 card shadow-xl py-4 px-4 my-2 w-full">
          <div class="flex flex-col w-full ">
              <b>{{ t('process.proposal') }}</b>
              <input type="text" class="input input-bordered input-sm my-2 w-full"/>
              <label>{{ t('process.description') }}</label>
              <input type="text" class="input input-bordered input-sm my-2 w-full"/>
          </div>
      </div>
  </div>
  <div v-if="$process.phases === 'voting'" align="center">
      <button id="add-proposal" class="btn p-2" >
          {{ t('process.addProposal') }}
      </button>
  </div>
</template>