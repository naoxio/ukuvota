<template>
  <div>
    <q-field :error-label="errorLabel">
      <q-input :inverted=inverted :type="type" v-model="val" :error="error" :float-label="floatLabel" :max-height="maxHeight" :min-rows="minRows"/>
    </q-field>
  </div>
</template>

<script>
  import { QInput, QField } from 'quasar'

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
      maxHeight: { required: false },
      minRows: { required: false },
      inverted: { required: false }
    },
    watch: {
      val (newVal) {
        this.$emit('update:value', newVal)
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
