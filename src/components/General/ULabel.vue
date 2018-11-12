<template>
  <div v-html="trusted" :class="{ multiline }" />
</template>
<script>
  import sanitizeHtml from 'sanitize-html'
  import anchorme from 'anchorme'

  export default {
    props: {
      value: { required: true },
      hyperlink: { default: false, type: Boolean },
      multiline: { default: false, type: Boolean }
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
