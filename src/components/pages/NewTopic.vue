<template>
  <main-layout>
    <q-card style="max-width: 700px; text-align: left;">
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
        <q-select
          float-label="Voting Time"
          radio
          v-model="votingSelect"
         :options="votingTimes"
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
import Firebase from 'firebase'
import MainLayout from '@/layouts/MainLayout'
import { QAlert, QBtn, QCard, QCardMain, QCardMedia, QCardTitle, QDatetimeRange, QField, QInput, QInlineDatetime, QItem, QItemMain, QItemSide, QList, QSelect } from 'quasar'

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
      test: Firebase,
      proposalSelect: '2',
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
      votingSelect: '1',
      votingTimes: [
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
      ]
    }
  }
}
</script>
<style lang="stylus">

</style>
