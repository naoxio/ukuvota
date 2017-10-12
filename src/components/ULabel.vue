<template>
  <div v-html="value"/>
</template>
<script>

export default {
  props: {
    value: { required: true }
  }
}
</script>
<style lang="stylus" scoped>

</style>
