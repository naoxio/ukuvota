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
import Icon from 'atoms/Icon.vue';
const $process = useStore(process)

const toggleDefaultProposals = (ev: any) => {
    process.setKey('defaultProposals', ev.target.checked)
}

const template_default_proposals = [
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
const scrollTopicQuestion = ref(null)
const errorTopicAlert = ref(false)
const successProcessAlert = ref(false)
const createProcess = async() => {
  const title = $process.value.title
  if (typeof title === 'string' && title.trim().length === 0) {
    errorTopicAlert.value = !errorTopicAlert.value
    nextTick()
    scrollTopicQuestion.value.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    
    return
  }
  const proposals = $process.value.phases === 'full' ? $process.value.defaultProposals ? template_default_proposals : [] : JSON.parse( JSON.stringify($process.value.proposals))

  const body = {
    topicQuestion: $process.value.title,
    topicDescription: $process.value.description,
    proposalDates: $process.value.proposalDates,
    votingDates: $process.value.votingDates,
    weighting: $process.value.weighting,    
    proposals
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

const addProposal = () => {
  const proposals = JSON.parse( JSON.stringify($process.value.proposals))
  proposals.push({
    title: '',
    description: ''
  })
  process.setKey("proposals", proposals)
}

const updateProposal = (ev, i: number, key: string) => {
  const val = ev.target.value
  const proposals = JSON.parse( JSON.stringify($process.value.proposals))
  const proposal = proposals[i]
  proposal[key] = val
  process.setKey("proposals", proposals)

}
const deletePropsal = (i: number) => {
  const proposals = JSON.parse( JSON.stringify($process.value.proposals))
  proposals.splice(i, 1)
  process.setKey("proposals", proposals)

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
  <div ref="scrollTopicQuestion"/>
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
    <div class="flex flex-col justify-around align-center items-center">
        <div v-for="[i, proposal] in Object.entries($process.proposals)" class="proposal bg-base-100 card shadow-xl py-4 px-4 my-2 w-full">
          <div class="flex items-center">
            <div class="flex flex-col w-full ">
                <b>{{ t('process.proposal') }}</b>
                <input @input="(ev) => updateProposal(ev, Number(i), 'title')" type="text" class="input input-bordered input-sm my-2 w-full" :value="proposal.title"/>
                <label>{{ t('process.description') }}</label>
                <input @input="(ev) => updateProposal(ev, Number(i), 'description')" type="text" class="input input-bordered input-sm my-2 w-full" :value="proposal.description"/>
            </div>
          
            <button name="delete" @click="deletePropsal(Number(i))" class="btn btn-circle btn-ghost p-2 m-2 btn-md">
              <Suspense>
                <Icon name="trash-can"/>
              </Suspense>
            </button>
          </div>

        </div>
    </div>
    <button @click="addProposal" class="btn p-2" >
        {{ t('process.addProposal') }}
    </button>
  </div>
  <br/>
  <br/>
  <div class="text-center">
    <button type="submit" class="btn btn-primary" @click="createProcess">
      {{ t('create') }}
    </button>
  </div>
</template>