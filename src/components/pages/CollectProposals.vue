<template>
  <main-layout>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <h5>Add Proposal</h5>
        <div class="row justify-between items-center" >
          <div class="col-8">
            <q-input v-model="text" float-label="Proposal" />
          </div>
          <div class="col-3">
            <q-btn icon="arrow forward">Add</q-btn>
          </div>
        </div>
      </q-card-main>
      <q-list highlight>
        <q-list-header>Current Proposals</q-list-header>
        <q-item>
          <q-item-main>
            <q-item-tile label>Change Nothing</q-item-tile>
          </q-item-main>
        </q-item>
        <q-item-separator />
        <q-item>
          <q-item-main label="Repeat Process " />
        </q-item>
      </q-list>
    </q-card>
  </main-layout>
</template>
<script>
import MainLayout from '@/layouts/MainLayout'
import { QBtn, QCard, QCardMain, QCardMedia, QCardTitle, QDatetimeRange, QField, QInput, QItem, QItemMain, QItemTile, QItemSide, QList, QListHeader } from 'quasar'

export default {
  components: {
    MainLayout,
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
    QItemTile,
    QList,
    QListHeader
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="stylus">

</style>
