
<script lang="ts" setup>
import { t } from 'i18next';

import { Suspense } from 'vue';
import { useStore } from '@nanostores/vue';
import { process } from 'stores/processStore';
import QuillEditor from 'molecules/QuillEditor.vue';

const $process = useStore(process);


const updateProposal = (ev, i: number, key: string) => {
    const proposals = JSON.parse( JSON.stringify($process.value.proposals))
    const proposal = proposals[i]
    proposal[key] = ev.target.value
    process.setKey("proposals", proposals)
}

const deleteProposal = (i: number) => {
    const proposals = JSON.parse( JSON.stringify($process.value.proposals))
    proposals.splice(i, 1)
    process.setKey("proposals", proposals)
}

</script>

<template>
    <div class="flex flex-col justify-around align-center items-center">
      <div v-for="(proposal, index) in $process.proposals" class="proposal bg-base-100 card shadow-xl py-4 px-4 my-2 w-full" :key="index">
        <div class="flex items-center">
          <div class="flex flex-col w-full">
            <b>{{ t('process.proposal') }}</b>
            <input @input="updateProposal($event, index, 'title')" type="text" class="input input-bordered input-sm my-2 w-full" :value="proposal.title"/>
            <label>{{ t('process.description') }}</label>
            <QuillEditor :index="index" />
          </div>
        </div>
        <div class="flex justify-center w-full pt-2">
          <button name="delete" @click="deleteProposal(index)" class="btn btn-ghost text-error btn-xs">
            <Suspense>
              {{ t('delete') }}
            </Suspense>
          </button>
        </div>
      </div>
    </div>
</template>
    