<script lang="ts" setup>
import weightingOptions from "composables/weightingOptions";
import { t } from 'i18next';
import { process } from '../../stores/processStore';

const $weighting = process.get().weighting
</script>
<template>
    <span>{{ t('quick.weighting') }}</span>
    <span class="flex justify-center items-center">
        <select name="weighting" class="select mx-2 select-bordered mt-2" :value="$weighting" @change="(e: any) => process.setKey('weighting', e.target.value)">
          <option v-for="weight in weightingOptions" :value="weight.value">
            <span v-if="Number(weight.value) > 0"> {{ weight.label }}</span>
            <span v-else>&infin;</span>
          </option>
        </select>
    </span>
</template>