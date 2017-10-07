<template>
  <div>
    <q-field :error-label="errorLabel"  >

      <q-input v-model="val" :error="error"/>
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
      error: { required: false }
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


</style>
