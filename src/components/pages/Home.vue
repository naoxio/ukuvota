<template>
  <main-layout>
    <center>
      <img src="statics/logo.png" width="128px"/>
      <p class="title">Ukuvota</p>
    </center>
    <q-card>
      <q-card-main>
        <q-alert
          color="dark"
          icon="toys"
          appear
          dismissible
        >
          optional fields are marked with an asterix (*)
        </q-alert>
        <q-input v-model="text" float-label="Topic Question" />
        <q-input
          v-model="area"
          type="textarea"
          float-label="* Description"
          :max-height="50"
          :min-rows="7"
        />
        <div style="text-align: right">
          <q-btn icon="arrow forward">Next</q-btn>
        </div>
      </q-card-main>
    </q-card>
  </main-layout>
</template>
<script>
import MainLayout from '@/layouts/MainLayout'
import { QAlert, QBtn, QCard, QCardMain, QCardMedia, QCardSeperator, QCardTitle, QDatetimeRange, QField, QInput, QItem, QItemMain, QItemSide, QList, QModal, QModalLayout, QToolbar, QToolbarTitle, QTree } from 'quasar'

export default {
  components: {
    MainLayout,
    QAlert,
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
