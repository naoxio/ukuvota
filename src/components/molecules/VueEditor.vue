<script lang="ts" setup>
import { QuillEditor, Delta } from '@vueup/vue-quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import { watchEffect, computed} from 'vue';
import { options } from 'composables/quillEditor';
import { process } from 'stores/processStore';
import { theme } from 'stores/userStore';
import { useStore } from '@nanostores/vue';


const emit = defineEmits(['update:content']);
const $theme = useStore(theme);

const props = defineProps({
  index: {
    type: Number,
    required: false,
  },
});

const updateContent = (content: Delta) => {
  if (props.index) {
    const proposals = process.get().proposals
    proposals[props.index].description = content
    process.setKey("proposals", proposals)
  }
  else {
    process.setKey("description", content);
  }
};

const content = computed(() => props.index
  ? process.get().proposals[props.index].description
  : process.get().description);

watchEffect(() => {
  emit('update:content', content);
});

const editorOptions = options;
</script>

<template>
  <div :class="{'dark': $theme === 'dark' }">
    <QuillEditor ref="editor" class="w-full" :options="options" :content="new Delta(content)" @update:content="updateContent" />
  </div>
</template>

<style is:inline>

.dark .ql-container, .dark .ql-toolbar  {
  border-color: #444  !important;
}

.dark .ql-container {
  background-color: hsl(var(--b1) / var(--tw-bg-opacity));
}
.ql-container {
  background-color: #f6f0f6;
}

.dark .ql-stroke {
  stroke: #d0d0d0;
}
</style>