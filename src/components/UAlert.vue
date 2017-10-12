<template>
  <div>
    <span v-if="submitted">
      <q-alert
        color="light"
        icon="done"
        dismissible
        >
        <ULabel class="linklight" :value="value" />
      </q-alert>
    </span>
  </div>
</template>
    
<script>
  import { QAlert } from 'quasar'
  import ULabel from '@/ULabel'

  export default {
    components: {
      ULabel,
      QAlert
    },
    props: {
      value: { required: true },
      submitted: { required: false }
    }
  }
</script>
<style lang="stylus">
.linklight
  a
    text-decoration none
    color yellow
</style>
