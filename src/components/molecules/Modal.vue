<script lang="ts" setup>

const props = defineProps({
  id: String
})


</script>
<template>
  <IconBar></IconBar>
  <label for={id} class="btn btn-ghost btn-sm btn-circle">
    <Icon width="22" icon="/icons/information.svg"/>
  </label>

  <input type="checkbox" id={id} class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <label for={id} class="btn btn-sm btn-circle absolute right-2 top-2">
        <Icon width="22" icon="close"/>
      </label>
      <slot/>
    </div>
  </div>
</template>