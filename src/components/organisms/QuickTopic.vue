<script lang="ts" setup>
import { t } from 'i18next';

import weightingOptions from "../../composables/weightingOptions";

const weighting = weightingOptions[2].value;


</script>

<template>
  <div class="pb-6">
    <div>
      <p>{{ t('quick.topic') }}</p>
      <input name="topicQuestion" class="input input-bordered w-full" value='' type="text">
      <br>
      <p>{{ t('quick.description') }}</p>
      <textarea name="topicDescription" class="textarea textarea-bordered w-full" value='' />
      <br><br>
      <span>{{ t('quick.weighting') }}</span>
      <span class="flex justify-center items-center">
        <select name="weighting" class="select mx-2 select-bordered mt-2" :value="weighting">
          <option v-for="weight in weightingOptions" :value=weight.value>
            <span v-if="Number(weight.value) > 0"> {{ weight.label }}</span>
            <span v-else>&infin;</span>
          </option>
        </select>
      </span>
    </div>
    <h2>{{ t('quick.phases.select') }}</h2>
    <div class="flex justify-around">
      <div class="flex items-center">
        <input id="full-phase" type="radio" name="phase-radio" ref="phase" class="radio radio-primary" checked/>
        <label for="full-phase" class="mx-2 cursor-pointer	" >{{ t('quick.phases.full') }}</label>
      </div>
      <div class="flex items-center">
        <input id="voting-phase" type="radio" name="phase-radio" class="radio radio-primary" />
        <label for="voting-phase" class="mx-2 cursor-pointer	">{{ t('quick.phases.voting') }}</label>
      </div>
    </div>
  </div>
</template>