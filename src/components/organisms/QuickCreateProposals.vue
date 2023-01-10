<script lang="ts" setup>
import { t } from 'i18next';
import { useStore } from '@nanostores/vue';
import { quickPhases, Phases, defaultProposals } from '../../stores/quickStore';

const $quickPhases = useStore(quickPhases);
const $defaultProposals = useStore(defaultProposals);

</script>
<template>

    <div v-if="$quickPhases === Phases.Voting">
        <hr class="mt-4"/>
        <h2 class="pt-2">{{ t('quick.proposals') }}</h2>
    </div>
    <div class="flex justify-center items-center">
        <input name="defaultProposals" type="checkbox" :checked="$defaultProposals" class="checkbox" />

        <span>&nbsp;{{ t('quick.addDefaultProposals') }}</span>
        <!--Modal id="defaultProposalInfo">
            <h3>{{ t('quick.defaultProposals') }}</h3>
            <ContentDoc file_name="DefaultProposals"/>
        </Modal-->
    </div>
    <div class="flex justify-around align-center items-center">
       
        <div v-if="$quickPhases === Phases.Voting">
            <div class="proposal bg-base-100 card shadow-xl py-2 px-4 my-4">
                <div class="edit flex justify-between items-center">
                    <div class="content flex flex-col w-full">
                        <b>{{ t('quick.topic') }}</b>
                        <input type="text" class="input input-bordered input-sm my-2"/>
                        <label>{{ t('quick.description') }}</label>
                        <input type="text" class="input input-bordered input-sm my-2"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="$quickPhases === Phases.Voting">

        <button id="add-proposal" class="btn p-2" >
            add proposal
        </button>
    </div>
</template> 