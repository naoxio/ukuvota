<template>
  <main-layout>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <q-field 
          error-label="Please add a Topic Question"
        >
          <q-input v-model="topicQuestion"
            float-label="Topic Question"
            :error="topicMissing"
            />
        </q-field>
        <p class="caption row justify-between">
          Proposal Collection Time
          <q-chip>
            Days: {{proposalDays}}
            Hours: {{proposalHours}}
            Minutes: {{proposalMinutes}}
          </q-chip>
        </p>
        <q-slider :step="1" v-model="proposalDays" :min="0" :max="62" label snap></q-slider>
        <q-slider :step="1" v-model="proposalHours" :min="0" :max="24" label snap></q-slider>
        <q-slider :step="1" v-model="proposalMinutes" :min="1" :max="60" label snap></q-slider>

        <p class="caption row justify-between">
          Voting Time
          <q-chip>
            Days: {{votingDays}}
            Hours: {{votingHours}}
            Minutes: {{votingMinutes}}
          </q-chip>
        </p>
        <q-slider :step="1" v-model="votingDays" :min="0" :max="62" label snap></q-slider>
        <q-slider :step="1" v-model="votingHours" :min="0" :max="24" label snap></q-slider>
        <q-slider :step="1" v-model="votingMinutes" :min="1" :max="60" label snap></q-slider>

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
import { date, uid, QAlert, QBtn, QCard, QCardMain, QCardMedia, QCardTitle, QChip, QField, QInput, QInlineDatetime, QItem, QItemMain, QItemSide, QList, QSelect, QSlider } from 'quasar'
import { setTopic } from '@/data'

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
    QChip,
    QField,
    QInlineDatetime,
    QInput,
    QItem,
    QItemMain,
    QItemSide,
    QList,
    QSelect,
    QSlider
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
        let id = uid()

        let today = new Date()
        let endProposal = addToDate(today, {days: this.proposalDays, hours: this.proposalHours, minutes: this.proposalMinutes})
        let diff = date.formatDate(endProposal, 'x') - date.formatDate(today, 'x')
        let endVoting = addToDate(today, {days: this.votingDays, hours: this.votingHours, minutes: this.votingMinutes, milliseconds: diff})
        // create a new Topic object
        let newTopic = {
          'question': this.topicQuestion,
          'proposalTime': endProposal,
          'votingTime': endVoting,
          'votingInterval': this.votingDays,
          'description': this.description,
          'id': id,
          'proposals': {
            'Change Nothing': 'keep things the way they are',
            'Repeat Process': 'look for other options and repeat the process'
          },
          'emojis': {
            'Change Nothing': 0,
            'Repeat Process': 0
          },
          'votes': {},
          'result': {}
        }
        let tmp = this
        setTopic(newTopic).then(function () {
          // go to collect vue after saving topic data
          tmp.$router.push({name: 'collect', params: { id: id }})
        })
      }
    }
  },
  data () {
    return {
      description: '',
      topicQuestion: '',
      topicMissing: false,
      visible: false,
      proposalMinutes: 1,
      proposalHours: 0,
      proposalDays: 2,
      votingMinutes: 1,
      votingHours: 0,
      votingDays: 1
    }
  }
}
</script>
<style lang="stylus">

</style>
