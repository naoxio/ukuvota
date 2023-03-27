
<script setup lang="ts">
import { t } from 'i18next';
import { defineProps, computed, ref } from 'vue';
import { useStore } from '@nanostores/vue';
import { process } from 'stores/processStore';
import { Delta } from '@vueup/vue-quill'

interface DropdownOption {
  title: string;
  description: Delta;
}

const props = defineProps({
  isWrapping: Boolean,
});


const $process = useStore(process)
const dropdownMenu = ref(null)

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

const containerClasses = computed(() => ({
  'flex items-center flex-wrap': true,
  'justify-between': !props.isWrapping,
  'justify-center': props.isWrapping,
}));



</script>


<template>
    <span :class="containerClasses">
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
  