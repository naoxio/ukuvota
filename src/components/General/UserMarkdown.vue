<template>
  <div class="markdown" v-html="rendered" />
</template>

<script>
import markdown from './markdownRenderer'

export default {
  props: {
    source: {
      required: true,
      type: String
    }
  },
  computed: {
    rendered () {
      if (!this.source) return
      return markdown.render(this.source)
    }
  }
}
</script>

<style scoped lang="stylus">
.markdown
  overflow-wrap break-word
.markdown >>>
  p
    font-size 1em
    margin-bottom 0.5rem
  h1, h2, h3, h4, h5, h6
    font-size 1.1em
    margin 0.5rem 0px
  pre
    font-size 0.8em
    padding 3px
    background-color #ededed
    margin-top 0.5rem
    margin-bottom 0.5rem
    overflow-x auto
    overflow-wrap normal
    display block
  p > code
    font-size 0.8em
    padding-left 3px
    padding-right 3px
    background-color #ededed
    overflow-x auto
    overflow-wrap normal
    display block
  img
    max-height 150px
    max-width 300px
</style>
