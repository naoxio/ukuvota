<template>
  <q-checkbox v-model="selection" :val="name" :label="name"/>
</template>

<script>
import {
  QCheckbox
} from 'quasar'

export default {
  props: {
    name: { required: true },
    options: { required: true }
  },
  components: {
    QCheckbox
  },
  watch: {
    selection (newVal) {
      this.res = {}
      this.$emit('update:options', newVal)
    }
  },
  data () {
    return {
      selection: this.options
    }
  }
}
</script>

<style lang="stylus">

</style>
