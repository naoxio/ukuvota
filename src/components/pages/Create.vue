<template>
  <main-layout>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <template v-if="topicMissing && topicMissing !== null">
          <q-alert
            color="dark"
            icon="warning"
          >
            Topic Question Is Missing
          </q-alert>
        </template>

        <q-input float-label="Topic Question" v-model="topicQuestion"/>
        <q-field label="Proposal Collection Time"></q-field>
        <div class="row">
          <q-select
            radio
            class="col-4"
            float-label="Days"
            v-model="proposalDaySelect"
           :options="proposalDays"
          />
          <q-select
            radio
            class="col-4"
            float-label="Hours"
            v-model="proposalHourSelect"
           :options="proposalHours"
          />
          <q-select
            radio
            class="col-4"
            float-label="Minutes"
            v-model="proposalMinuteSelect"
           :options="proposalMinutes"
          />
        </div>
        <q-field label="Voting Time"></q-field>
        <q-select
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
import { date, LocalStorage, uid, QAlert, QBtn, QCard, QCardMain, QCardMedia, QCardTitle, QField, QInput, QInlineDatetime, QItem, QItemMain, QItemSide, QList, QSelect } from 'quasar'

const { addToDate } = date

export default {
  components: {
    MainLayout,
    QAlert,
    QBtn,
    QCard,
    QCardMain,
    QCardMedia,
    QCardTitle,
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
      // error check
      if (this.topicQuestion === '') {
        this.topicMissing = true
        error = true
      }
      else {
        this.topicMissing = false
      }

      if (!error) { // if no errors proceed
        let topics = JSON.parse(LocalStorage.get.item('topics'))
        let id = uid()

        // if localstorage item 'topics' doesnt exist create empty array
        if (topics === null) {
          topics = []
        }

        let today = new Date()
        let endProposal = addToDate(today, {days: this.proposalDaySelect, hours: this.proposalHourSelect, minutes: this.proposalMinuteSelect})
        let diff = date.formatDate(endProposal, 'x') - date.formatDate(today, 'x')
        let endVoting = addToDate(today, {days: this.votingSelect, milliseconds: diff})
        // create a new Topic object
        let newTopic = {
          'question': this.topicQuestion,
          'proposalTime': endProposal,
          'votingTime': endVoting,
          'votingInterval': this.votingSelect,
          'description': this.description,
          'id': id,
          'proposals': {
            'Change Nothing': 'keep things the way they are',
            'Repeat Process': 'look for other options and repeat the process'
          },
          'emojis': {
            'Change Nothing': 0,
            'Repeat Process': 0
          }
        }
        topics.push(newTopic)

        // update localstorage topics content
        LocalStorage.set('topics', JSON.stringify(topics))

        // go to collectProposals vue
        this.$router.push({name: 'collect', params: { id: id }})
    //    this.$router.push(id + '/collect')
      }
    }
  },
  data () {
    return {
      description: '',
      topicQuestion: '',
      topicMissing: false,
      visible: false,
      proposalMinutes: [
        {
          label: '',
          value: 0
        },
        {
          label: '1 Minute',
          value: 1
        },
        {
          label: '5 Minutes',
          value: 5
        },
        {
          label: '13 Minutes',
          value: 13
        },
        {
          label: '21 Minutes',
          value: 21
        },
        {
          label: '34 Minutes',
          value: 34
        },
        {
          label: '55 Minutes',
          value: 55
        }
      ],
      proposalMinuteSelect: 0,
      proposalHours: [
        {
          label: '',
          value: 0
        },
        {
          label: '1 Hour',
          value: 1
        },
        {
          label: '2 Hours',
          value: 2
        },
        {
          label: '3 Hours',
          value: 3
        },
        {
          label: '5 Hours',
          value: 5
        },
        {
          label: '8 Hours',
          value: 8
        },
        {
          label: '13 Hours',
          value: 13
        },
        {
          label: '21 Hours',
          value: 21
        }
      ],
      proposalHourSelect: 0,
      proposalDays: [
        {
          label: '',
          value: 0
        },
        {
          label: '1 Day',
          value: 1
        },
        {
          label: '2 Days',
          value: 2
        },
        {
          label: '3 Days',
          value: 3
        },
        {
          label: '5 Days',
          value: 5
        },
        {
          label: '8 Days',
          value: 8
        },
        {
          label: '13 Days',
          value: 13
        },
        {
          label: '21 Days',
          value: 21
        },
        {
          label: '34 Days',
          value: 21
        }
      ],
      proposalDaySelect: 2,
      votingSelect: 1,
      votingTimes: [
        {
          label: '1 Day',
          value: 1
        },
        {
          label: '2 Days',
          value: 2
        },
        {
          label: '3 Days',
          value: 3
        },
        {
          label: '5 Days',
          value: 5
        },
        {
          label: '8 Days',
          value: 8
        },
        {
          label: '13 Days',
          value: 13
        },
        {
          label: '21 Days',
          value: 21
        },
        {
          label: '34 Days',
          value: 34
        }
      ]
    }
  }
}
</script>
<style lang="stylus">

</style>
