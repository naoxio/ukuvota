<script lang="ts" setup>
import i18next from "i18next";

const props = defineProps({
    file_name: String
})

const content = await import(`../../content/${i18next.language}/${props.file_name}.md`);
</script>

<template>
    <div v-html="content.compiledContent()" />
</template>