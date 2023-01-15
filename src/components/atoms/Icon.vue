<script lang="ts" setup>
import { theme } from 'stores/userStore'
import { useStore } from '@nanostores/vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  invert: {
    type: Boolean,
    required: false
  }
})
const icon = await import(`../../icons/${props.name}.svg`);

const $theme = useStore(theme)
</script>
<style scoped>
.dark {
  filter: invert(100%);
}
</style>
<template>
    <img :class="{'dark': ($theme === 'dark') !== invert }" :src="icon.default"/>
</template>