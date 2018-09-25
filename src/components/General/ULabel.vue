<template>
  <div v-html="trusted" />
</template>
<script>
  import sanitizeHtml from 'sanitize-html'
  import anchorme from 'anchorme'

  export default {
    props: {
      value: { required: true },
      hyperlink: { default: false }
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
</style>
