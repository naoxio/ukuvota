<template>
  <main-layout>
  <p>help me please</p>
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
          <router-link :to="{ name: 'collectProposals' }">
            <q-btn icon="arrow forward">Next</q-btn>
          </router-link>
        </div>
      </q-card-main>
    </q-card>
  </main-layout>
</template>
<script>
import MainLayout from '@/layouts/MainLayout'
import { QAlert, QBtn, QCard, QCardMain, QCardMedia, QCardTitle, QDatetimeRange, QField, QInput, QInlineDatetime, QItem, QItemMain, QItemSide, QList } from 'quasar'

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
    QInlineDatetime,
    QInput,
    QItem,
    QItemMain,
    QItemSide,
    QList
  },
  data () {
    return {
      text: 'text',
      area: 'textarea'
    }
  }
}
</script>
<style lang="stylus">

</style>
