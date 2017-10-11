<template>
  <q-card style="max-width: 700px; text-align: left;">
    <q-card-main>
      <slot />
    </q-card-main>
  </q-card>
</template>

<script>
  import { QCard, QCardMain } from 'quasar'

  export default {
    components: {
      QCard,
      QCardMain
    }
  }
</script>
