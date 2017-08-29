<template>
  <main-layout>
    <center>
      <img src="statics/logo.png" width="128px"/>
      <p class="title">Ukuvota</p>
    </center>
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
body
  font-family 'coolFont'

.title
  font-size 32px
</style>
