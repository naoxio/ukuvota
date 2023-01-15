<script lang="ts" setup>
import Icon from 'atoms/Icon.vue';
import { boolean, string } from 'zod';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
})

</script>

<template>
  <label :for="id" class="btn btn-ghost btn-sm btn-circle">
    <Suspense>
      <Icon name="information"/>    
    </Suspense>
  </label>

  <input type="checkbox" :id="id" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <label :for="id" class="btn btn-sm btn-circle absolute right-2 top-2">
        <Suspense>
          <Icon name="close" invert/>    
        </Suspense>
      </label>
      <Suspense>
        <slot/>
      </Suspense>
    </div>
  </div>
</template>
