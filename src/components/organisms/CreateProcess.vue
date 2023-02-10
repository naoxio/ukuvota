<script lang="ts" setup>
import i18next, { t } from 'i18next';
import { process } from '../../stores/processStore';

import WeightSelector from "molecules/WeightSelector.vue"
import { useStore } from '@nanostores/vue';
import AlertManager from 'molecules/AlertManager.vue';
import Alert from 'molecules/Alert.vue'
import TimeSelector from "molecules/TimeSelector.vue";
import { IProposal } from '../../../shared/interfaces/IProposal';

import { ref, nextTick } from 'vue'
import Icon from 'atoms/Icon.vue';
const $process = useStore(process)

const defaultProposals = [
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
const errorProposalsAlert = ref(false)
const successProcessAlert = ref(false)

const checkProposalValues = (proposals: IProposal[]) => {
  return proposals.every(proposal => proposal.title !== '' || proposal.description !== '');
}
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
  const proposals = $process.value.phases === 'full' ? [] : JSON.parse( JSON.stringify($process.value.proposals))
  if ($process.value.phases === 'voting' && (proposals.length < 2 || !checkProposalValues(proposals))) {
    errorProposalsAlert.value = !errorProposalsAlert.value

    return
  }

  const body = {
    topicQuestion: $process.value.title,
    topicDescription: $process.value.description,
    proposalDates: $process.value.phases === 'full' ? $process.value.proposalDates : [-1, -1],
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
    process.setKey('proposals', [])

    window.location.href = `/${lang !== 'en' ? `${lang}/` : '' }process/${json.id}`
  }
}

const addProposal = (template: number = null) => {
  const proposals = JSON.parse( JSON.stringify($process.value.proposals))
  proposals.push(
    template !== null ? defaultProposals[template] : {
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
const proposalTemplates = ref(0)

</script>

<template>
  <AlertManager>
    <Alert :trigger="errorTopicAlert" error icon="warning">
      {{ t('alert.error.topicQuestion') }}
    </Alert>
    <Alert :trigger="successProcessAlert" success icon="checkmark-outline">
      {{ t('alert.success.createProcess') }} 
    </Alert>
    <Alert :trigger="errorProposalsAlert" error icon="warning">
      {{ t('alert.error.proposalsMissing') }}
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
    <h2>{{ t('process.proposals') }}</h2>     
    <div class="flex flex-col justify-around align-center items-center">
        <div v-for="[i, proposal] in Object.entries($process.proposals)" class="proposal bg-base-100 card shadow-xl py-4 px-4 my-2 w-full">
          <div class="flex items-center">
            <div class="flex flex-col w-full">
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
    <br/>
    <span class="flex items-center justify-between">
      <button @click="addProposal()" class="btn p-2" >
          {{ t('process.addProposal') }}
      </button>
      <div class="dropdown">
        <label tabindex="0" class="btn m-1">{{ t('addProposalTemplate') }}</label>
        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
          <li><a @click="addProposal(0)" class="flex flex-col">
            <b>{{ t('proposal.zero.title') }}</b>
            <p>{{ t('proposal.zero.description') }}</p>
          </a></li>
          <li><a @click="addProposal(1)" class="flex flex-col">
            <b>{{ t('proposal.one.title') }}</b>
            <p>{{ t('proposal.one.description') }}</p>
          </a></li>
        </ul>
      </div>
    </span>
  </div>
  <br/>
  <br/>
  <div class="text-center">
    <button type="submit" class="btn btn-primary" @click="createProcess">
      {{ t('create') }}
    </button>
  </div>
</template>