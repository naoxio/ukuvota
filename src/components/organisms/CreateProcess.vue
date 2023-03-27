<script lang="ts" setup>
import i18next, { t } from 'i18next';
import { process } from 'stores/processStore';
import { useStore } from '@nanostores/vue';
import { IProposal } from 'interfaces/IProposal';
import { ref, nextTick } from 'vue'
import { Delta, Quill } from '@vueup/vue-quill'

import AlertManager from 'molecules/AlertManager.vue';
import Alert from 'molecules/Alert.vue'
import TimeSelector from "molecules/TimeSelector.vue";
import AddProposals from 'molecules/AddProposals.vue'
import VueEditor from 'molecules/VueEditor.vue';

const $process = useStore(process)

const lang = i18next.language
const scrollTopicQuestion = ref(null)
const errorTopicAlert = ref(false)
const errorProposalsAlert = ref(false)
const errorPayloadSize = ref(false)
const successProcessAlert = ref(false)

// Check if all proposals have a title and description
const checkProposalValues = (proposals: IProposal[]) => {
  return proposals.every((proposal: IProposal) => proposal.title !== '' || proposal.description !== '');
}

const description = ref()

function quillGetHTML(inputDelta: Delta) {
    var tempCont = document.createElement("div");
    (new Quill(tempCont)).setContents(inputDelta);
    return tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
}

// Create process
const createProcess = async() => {
  const title = $process.value.title
  const trimmedTitle = typeof title === 'string' && title.trim();
  
  if (!trimmedTitle) {
    errorTopicAlert.value = !errorTopicAlert.value;
    nextTick(() => scrollTopicQuestion.value.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    return;
  }
  
  let proposals = $process.value.phases === 'full' ? [] : JSON.parse( JSON.stringify($process.value.proposals))
  if ($process.value.phases === 'voting') {
    for (let i = 0; i < proposals.length; i++) {
      proposals[i].description = quillGetHTML(proposals[i].description)
    }

    if(proposals.length < 2 || !checkProposalValues(proposals)) {
      errorProposalsAlert.value = !errorProposalsAlert.value
      return
    }

  }
  // Prepare request body
  const body = {
    topicQuestion: $process.value.title,
    topicDescription: description.value.getHTML(),
    proposalDates: $process.value.phases === 'full' ? $process.value.proposalDates : -1,
    votingDates: $process.value.votingDates,
    weighting: $process.value.weighting,    
    proposals
  }

  let res: any, json: any;

  if (import.meta.env.DEV) return
  else {
    try {
      res = await fetch(`${location.origin}/api/process`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.status === 413) {
        errorPayloadSize.value = true;
        console.error('Payload size isoo large.');
        return;
      }

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


const updateProposal = (ev, i: number, key: string) => {
  const proposals = JSON.parse( JSON.stringify($process.value.proposals))
  const proposal = proposals[i]
  proposal[key] = ev.target.value
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
      {{ t('alert.error.topicQuestion') }}
    </Alert>
    <Alert :trigger="successProcessAlert" success icon="checkmark-outline">
      {{ t('alert.success.createProcess') }} 
    </Alert>
    <Alert :trigger="errorProposalsAlert" error icon="warning">
      {{ t('alert.error.proposalsMissing') }}
    </Alert>
    <Alert :trigger="errorPayloadSize" error icon="warning">
      {{ t('alert.error.payloadSizeTooLarge') }}
    </Alert>
  </AlertManager>
  <div ref="scrollTopicQuestion"/>
  <div class="pb-6">
    <div>
      <p>{{ t('process.topic') }}</p>
      <input name="topicQuestion" class="input input-bordered w-full" :value="$process.title"  @input="(e: any) => process.setKey('title', e.target.value)" type="text">
      <br>
      <p>{{ t('process.description') }}</p>
      <VueEditor />

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
        <h1 v-if="$process.phases === 'full'">{{ t('process.timeLeftHeading') }}</h1>
        <h1 v-if="$process.phases === 'voting'">{{ t('process.timeLeftVotingHeading') }}</h1>
    </div>

    <TimeSelector phase="proposal"/>
    <span  v-if="$process.phases === 'full'">
      <p></p><hr/>
    </span>
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
                <input @input="(ev: Event) => updateProposal(ev, Number(i), 'title')" type="text" class="input input-bordered input-sm my-2 w-full" :value="proposal.title"/>
                <label>{{ t('process.description') }}</label>
                <VueEditor :index="Number(i)" />
            </div>
          </div>
          <div class="flex justify-center w-full pt-2">
            <button name="delete" @click="deletePropsal(Number(i))" class="btn btn-ghost text-error btn-xs">
              <Suspense>
                {{ t('delete') }}
              </Suspense>
            </button>

          </div>
        </div>
    </div>
    <br/>
    <AddProposals/>
  </div>
  <br/>
  <br/>
  <div class="text-center">
    <button type="submit" class="btn btn-primary" @click="createProcess">
      {{ t('create') }}
    </button>
  </div>
</template>
