<template>
  <main-layout>
    <q-card>
      <q-card-main>
        <h5>Add Proposal</h5>
        <q-input v-model="text" float-label="Proposal" />

        <div style="text-align: right">
          <q-btn icon="arrow forward">Add</q-btn>
        </div>
      </q-card-main>
    </q-card>
  </main-layout>
</template>
<script>
import MainLayout from '@/layouts/MainLayout'
import { QAlert, QBtn, QCard, QCardMain, QCardMedia, QCardTitle, QDatetimeRange, QField, QInput, QItem, QItemMain, QItemSide, QList, QModal, QModalLayout, QToolbar, QToolbarTitle, QTree } from 'quasar'

export default {
  components: {
    MainLayout,
    QAlert,
    QBtn,
    QCard,
    QCardMain,
    QCardMedia,
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
