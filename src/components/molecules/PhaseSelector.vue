
<script lang="ts" setup>
    import { t } from 'i18next';
    import { useStore } from '@nanostores/vue';
    import { process } from 'stores/processStore';

    const $process = useStore(process);
</script>

<template>
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
</template>
    