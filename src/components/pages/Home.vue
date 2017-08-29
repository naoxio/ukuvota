<template>
  <main-layout>
    <p class="caption">On dark background</p>
      <div class="dark-example">
        <q-field
          dark
          icon="school"
          label="Javascript"
          helper="Pick a start time"
        >
          <q-datetime-range
            dark
            color="secondary"
            v-model="range8"
            type="time"
          />
        </q-field>
</div>
    <q-card>
      <q-card-main>
        <q-input v-model="text" float-label="Topic Question" />
        <!-- Datetime Range -->

      </q-card-main>
    </q-card>
  </main-layout>
</template>
<script>
import MainLayout from '@/layouts/MainLayout'
import { QBtn, QCard, QCardMain, QCardMedia, QCardSeperator, QCardTitle, QDatetimeRange, QField, QInput, QItem, QItemMain, QItemSide, QList, QModal, QModalLayout, QToolbar, QToolbarTitle, QTree } from 'quasar'

export default {
  components: {
    MainLayout,
    QBtn,
    QCard,
    QCardMain,
    QCardMedia,
    QCardSeperator,
    QCardTitle,
    QDatetimeRange,
    QField,
    QInput,
    QItem,
    QItemMain,
    QItemSide,
    QList,
    QModal,
    QModalLayout,
    QToolbar,
    QToolbarTitle,
    QTree
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="stylus">
</style>
