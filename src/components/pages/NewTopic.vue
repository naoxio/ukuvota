<template>
  <main-layout>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <template v-if="topicMissing && topicMissing !== null">
          <q-alert
            color="dark"
            icon="warning"
          >
            topic question is missing
          </q-alert>
        </template>

        <q-input float-label="Topic Question" v-model="topicQuestion"/>
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
          float-label="Description (optional)"
          v-model="description"
          :max-height="50"
          :min-rows="7"
        />
        <div style="text-align: right">
          <!--router-link :to="{ name: 'collectProposals' }"-->
            <q-btn @click="next()" icon="arrow forward">Next</q-btn>
          <!--/router-link-->
        </div>
      </q-card-main>
    </q-card>
  </main-layout>
</template>
<script>
import MainLayout from '@/layouts/MainLayout'
import { LocalStorage, uid, QAlert, QBtn, QCard, QCardMain, QCardMedia, QCardTitle, QDatetimeRange, QField, QInput, QInlineDatetime, QItem, QItemMain, QItemSide, QList, QSelect } from 'quasar'

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
  methods: {
    next () {
      let error = false
      if (this.topicQuestion === '') {
        this.topicMissing = true
        error = true
      }
      else {
        this.topicMissing = false
      }
      if (!error) {
        let topics = JSON.parse(LocalStorage.get.item('topics'))
        let id = uid()

        if (topics === null) {
          topics = []
        }
        let newTopic = {
          'topicQuestion': this.topicQuestion,
          'proposalTime': this.proposalSelect,
          'votingTime': this.votingSelect,
          'description': this.description,
          'id': id,
          'proposals': ['Change Nothing', 'Repeat Process']
        }
        topics.push(newTopic)
        LocalStorage.set('topics', JSON.stringify(topics))
        this.$router.push(id + '/collectProposals')
      }
    }
  },
  data () {
    return {
      description: '',
      topicQuestion: '',
      topicMissing: false,
      visible: false,
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
