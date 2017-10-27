<template>
  <div>
    <q-field :error-label="errorLabel">
      <q-input :inverted=inverted :type="type" v-model="val" :error="error" :float-label="floatLabel" :max-height="50" :min-rows="7"/>
    </q-field>
  </div>
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
      value: { required: true },
      errorLabel: { required: false },
      error: { required: false },
      type: { required: false },
      floatLabel: { required: false },
      minHeight: { required: false },
      minRows: { required: false },
      inverted: { required: false },
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
