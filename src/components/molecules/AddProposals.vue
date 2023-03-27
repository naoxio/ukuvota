
<script setup lang="ts">
import { t } from 'i18next';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useStore } from '@nanostores/vue';
import { process } from 'stores/processStore';
import { Delta } from '@vueup/vue-quill'

interface DropdownOption {
  title: string;
  description: Delta;
}


const $process = useStore(process)
const dropdownMenu = ref(null)
const isWrapping = ref(false)

const checkIsWrapping = () => {
  isWrapping.value = window.innerWidth <= 767;
};

onMounted(() => {
  checkIsWrapping();
  window.addEventListener('resize', checkIsWrapping);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkIsWrapping);
});

// Initialize variables
const dropdownOptions: DropdownOption[] = [
  {
    title: t('proposal.zero.title'),
    description: new Delta().insert(t("proposal.zero.description")),
  },
  {
    title: t('proposal.one.title'),
    description: new Delta().insert(t("proposal.one.description")),
  },
];

const addProposal = (template: number = null) => {
  const proposals = JSON.parse( JSON.stringify($process.value.proposals))
  proposals.push(
    template !== null ? dropdownOptions[template] : {
    title: '',
    description: ''
  })
  process.setKey("proposals", proposals)
}



</script>


<template>
    <span class="flex items-center flex-wrap" 
          :class="{'justify-between': !isWrapping, 'justify-center': isWrapping}">    
        <button @click="addProposal()" class="btn p-2">{{ t('process.addProposal') }}</button>
        <div class="dropdown">
            <label tabindex="0" class="btn m-1">{{ t('addProposalTemplate') }}</label>
            <ul ref="dropdownMenu" tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full">
            <li v-for="(option, index) in dropdownOptions" :key="index">
                <a @click="addProposal(index)" class="flex flex-col">
                <b>{{ option.title }}</b>
                <p>{{ option.description.ops[0].insert }}</p>
                </a>
            </li>
            </ul>
        </div>
    </span>
  </template>
  