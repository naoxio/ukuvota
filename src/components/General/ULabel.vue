<template>
  <div v-if="!markdown" v-html="trusted" :class="{ multiline }" />
  <UserMarkdown v-else class="sublabel" :source="value" />
</template>
<script>
  import sanitizeHtml from 'sanitize-html'
  import anchorme from 'anchorme'
  import UserMarkdown from '@/General/UserMarkdown'

  export default {
    components: {
      UserMarkdown
    },
    props: {
      value: { required: true },
      hyperlink: { default: false, type: Boolean },
      multiline: { default: false, type: Boolean },
      markdown: { default: false, type: Boolean }
    },
    computed: {
      trusted () {
        const untrusted = this.hyperlink ? anchorme(this.value) : this.value
        return sanitizeHtml(untrusted)
      }
    }
  }
</script>
<style lang="stylus" scoped>
  *
    margin 0.5em 0 0.5em 0
  .multiline
    white-space pre-wrap
</style>
