<template>
  <span v-html="content"/>
</template>
<script>
import i18n from 'src/i18n'

const content = {
  summary: {
    en: require('content/summary.en.md'),
    de: require('content/summary.de.md')
  },
  negativeScoreWeighting: {
    en: require('content/negativeScoreWeighting.en.md'),
    de: require('content/negativeScoreWeighting.de.md')
  }
}

export default {
  props: {
    name: { required: true }
  },
  computed: {
    content () {
      return content[this.name][i18n.locale]
    }
  }
}
</script>
