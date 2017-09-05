<template>
  <main-layout>
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
        <q-input float-label="Topic Question" />
        <q-select
          float-label="Proposal Collection Time"
          radio
          v-model="proposalSelect"
         :options="proposalTimes"
        />
        <q-input
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
import { date, QAlert, QBtn, QCard, QCardMain, QCardMedia, QCardTitle, QDatetimeRange, QField, QInput, QInlineDatetime, QItem, QItemMain, QItemSide, QList, QSelect } from 'quasar'

const today = new Date()
const { addToDate, subtractFromDate } = date

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
    QList,
    QSelect
  },
  data () {
    return {
      proposalSelect: '1',
      proposalTimes: [
        {
          label: '1 Day',
          value: '1'
        },
        {
          label: '2 Days',
          value: '2'
        },
        {
          label: '3 Days',
          value: '3'
        },
        {
          label: '4 Days',
          value: '4'
        },
        {
          label: '5 Days',
          value: '5'
        }
      ],
    }
  }
}
</script>
<style lang="stylus">

</style>
