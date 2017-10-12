<template>
  <div>
    <div v-if="hyperlink">
      <span v-html="val"/>
    </div>
    <div v-else>
      <span v-html="value"/>
    </div>
  </div>
</template>
<script>
  import anchorme from 'anchorme'

  export default {
    props: {
      value: { required: true },
      hyperlink: { default: false }
    },
    mounted () {
      if (this.hyperlink) this.val = anchorme(this.value)
      else this.val = this.value
    },
    data () {
      return {
        val: this.value
      }
    }
  }
</script>
<style lang="stylus" scoped>
  *
    margin 0.5em 0 0.5em 0
</style>
