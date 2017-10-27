<template>
  <q-field :error-label="errorLabel">
    <q-input :inverted=inverted :type="type" v-model="val" :error="error" :float-label="floatLabel" :max-height="50" :min-rows="7"/>
  </q-field>
</template>

<script>
  import { QInput, QField } from 'quasar'
  import anchorme from 'anchorme'

  export default {
    components: {
      QInput,
      QField
    },
    props: {
      value: String,
      errorLabel: String,
      error: { required: false },
      type: { required: false },
      floatLabel: String,
      minHeight: Number,
      minRows: Number,
      inverted: Boolean,
      hyperlink: { default: true }
    },
    watch: {
      val (newVal) {
        let result = newVal
        if (this.hyperlink) result = anchorme(newVal)
        this.$emit('update:value', result)
      }
    },
    data () {
      return {
        val: this.value
      }
    }
  }
</script>

<style>
</style>
