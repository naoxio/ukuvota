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
        <p class="caption">
          Proposal Collection Time
          <span>
            <br>
            <q-chip>
              Days: {{proposalDays}}
              Hours: {{proposalHours}}
              Minutes: {{proposalMinutes}}
            </q-chip>
          </span>
        </p>
        <q-slider :step="1" v-model="proposalDays" :min="0" :max="356" snap></q-slider>
        <q-slider :step="1" v-model="proposalHours" :min="0" :max="24" snap></q-slider>
        <q-slider :step="1" v-model="proposalMinutes" :min="1" :max="60" snap></q-slider>

        <p class="caption">
          Voting Time
          <span>
            <br>
            <q-chip>
              Days: {{votingDays}}
            </q-chip>
          </span>
        </p>
        <q-slider :step="1" v-model="votingDays" :label-value="`${votingDays} days`" :min="1" :max="356" label snap></q-slider>
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
import { date, LocalStorage, uid, QAlert, QBtn, QCard, QCardMain, QCardMedia, QCardTitle, QChip, QField, QInput, QInlineDatetime, QItem, QItemMain, QItemSide, QList, QSelect, QSlider } from 'quasar'

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
        let topics = JSON.parse(LocalStorage.get.item('topics'))
        let id = uid()

        // if localstorage item 'topics' doesnt exist create empty array
        if (topics === null) {
          topics = []
        }

        let today = new Date()
        let endProposal = addToDate(today, {days: this.proposalDays, hours: this.proposalHours, minutes: this.proposalMinutes})
        let diff = date.formatDate(endProposal, 'x') - date.formatDate(today, 'x')
        let endVoting = addToDate(today, {days: this.votingDays, milliseconds: diff})
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
      proposalMinutes: 1,
      proposalHours: 0,
      proposalDays: 2,
      votingDays: 1
    }
  }
}
</script>
<style lang="stylus">

</style>
