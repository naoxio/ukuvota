<template>
  <q-card style="max-width: 700px; text-align: left;">
    <q-card-main :class="{ nopad: nopad }">
      <slot />
    </q-card-main>
  </q-card>
</template>

<script>
  import { QCard, QCardMain } from 'quasar'

  export default {
    props: {
      nopad: Boolean
    },
    components: {
      QCard,
      QCardMain
    }
  }
</script>
<style lang="stylus" scoped>
  .nopad
    padding 0
</style>
