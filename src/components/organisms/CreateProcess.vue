<script lang="ts" setup>
import i18next, { t } from 'i18next';
import { process } from '../../stores/processStore';

import WeightSelector from "molecules/WeightSelector.vue"
import { useStore } from '@nanostores/vue';
import Modal from "molecules/Modal.vue";
import ContentDoc from "atoms/ContentDoc.vue"
import AlertManager from 'molecules/AlertManager.vue';
import Alert from 'molecules/Alert.vue'
import TimeSelector from "molecules/TimeSelector.vue";

import { ref, nextTick } from 'vue'

const $process = useStore(process)

const toggleDefaultProposals = (ev: any) => {
    process.setKey('defaultProposals', ev.target.checked)
}

const proposals = [
    {
        title: t("proposal.zero.title"),
        description: t("proposal.zero.description"),
    },
    {
        title: t("proposal.one.title"),
        description: t("proposal.one.description"),
    },
];

const lang = i18next.language
const topicQuestion = ref(null)
const errorTopicAlert = ref(false)
const successProcessAlert = ref(false)
const createProcess = async() => {
  const title = $process.value.title
  if (typeof title === 'string' && title.trim().length === 0) {
    errorTopicAlert.value = !errorTopicAlert.value
    nextTick()

    window.scrollTo(0,300)

    return
  }
  const body = {
    topicQuestion: $process.value.title,
    topicDescription: $process.value.description,
    proposalDates: $process.value.proposalDates,
    votingDates: $process.value.votingDates,
    weighting: $process.value.weighting,    
    proposals: $process.value.defaultProposals ?  proposals : []
  }
  let res: any, json: any;

  if (import.meta.env.DEV) window.location.href = `/${lang !== 'en' ? `${lang}/` : '' }process/dev`
  else {
    try {
      res = await fetch(`${location.origin}/api/process`, {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(body)
      });
      json = await res.json();
    } catch (error) {
      console.error(error);
      return;
    }
    
    process.setKey('title', '')
    process.setKey('description', '')

    window.location.href = `/${lang !== 'en' ? `${lang}/` : '' }process/${json.id}`
  }
}

</script>

<template>
  <AlertManager>
    <Alert :trigger="errorTopicAlert" error icon="warning">
      {{ t('alert.quick.error.topicQuestion') }}
    </Alert>
    <Alert :trigger="successProcessAlert" success icon="checkmark-outline">
      {{ t('alert.quick.success.createProcess') }} 
    </Alert>
  </AlertManager>
  <div class="pb-6">
    <div>
      <p>{{ t('process.topic') }}</p>
      <input ref="topicQuestion" name="topicQuestion" class="input input-bordered w-full" :value="$process.title" @input="(e: any) => process.setKey('title', e.target.value)" type="text">
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

  <div class="py-2">
    <div class="flex justify-between items-center flex-wrap">
        <h2 v-if="$process.phases === 'full'">{{ t('process.timeLeftHeading') }}</h2>
        <h2 v-if="$process.phases === 'voting'">{{ t('process.timeLeftVotingHeading') }}</h2>
    </div>

    <TimeSelector phase="proposal"/>
    <TimeSelector phase="voting"/>
  </div>
  <div v-if="$process.phases === 'voting'">
    <hr class="mt-4"/>
    <h2 class="pt-2">{{ t('process.proposals') }}</h2>
  </div>
  <div v-if="$process.phases === 'full'">
      <div class="flex justify-center items-center">
          <input id="default-proposals" name="default-proposals" type="checkbox" :checked="$process.defaultProposals" :value="$process.defaultProposals" @input="toggleDefaultProposals" class="checkbox" />
          <label for="default-proposals" class="cursor-pointer">&nbsp;{{ t('process.addDefaultProposals') }}</label>
          <Modal id="defaultProposalInfo">
              <h3>{{ t('process.defaultProposals') }}</h3>
              <ContentDoc file_name="DefaultProposals"/>
          </Modal>
      </div>
  </div>
  <div v-if="$process.phases === 'voting'">
    {{ t('wip') }}
    <!--div class="flex justify-around align-center items-center">
        <div class="proposal bg-base-100 card shadow-xl py-4 px-4 my-2 w-full">
            <div class="flex flex-col w-full ">
                <b>{{ t('process.proposal') }}</b>
                <input type="text" class="input input-bordered input-sm my-2 w-full"/>
                <label>{{ t('process.description') }}</label>
                <input type="text" class="input input-bordered input-sm my-2 w-full"/>
            </div>

        </div>
    </div>
    <div align="center">
        <button id="add-proposal" class="btn p-2" >
            {{ t('process.addProposal') }}
        </button>
    </div-->
  </div>
  <br/>
  <br/>
  <div class="text-center">
    <button type="submit" :class="{'btn-disabled': $process.phases === 'voting'}" class="btn btn-primary" @click="createProcess">
      <div v-if="$process.phases === 'voting'">
        {{ t('wip') }}
      </div>
      <div v-else>
        {{ t('create') }}
      </div>
    </button>
  </div>
</template>