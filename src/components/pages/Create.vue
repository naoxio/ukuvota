<template>
  <main-layout>
    <q-modal
      ref="weightingInfo"
      :content-css="{padding: '50px', minWidth: '50vw'}"
    >
      <h4>Negative Score Multiplier</h4>
      <p>
        Score voting normally values scores as equal increments and chooses the option the highest total score. For example, in a situation where there are three ways to score ('Resist, accept, support') the score values would be -1, 0 and +1. However, on the basis that scoring represents resistance and support, using this equal weighting treats resistance as 'negative support' and selects the option where R < A < S.
<br>
The simplest way to select the option where R << A < S is to weight resistance scores more heavily than support scores. Using a weighting factor of 3 would value non-resistance twice as favorably as support. It might be tempting to increase thie weighting factor to something in an attempt to avoid resistance however do so has consequences. If a weighting factor approaches the point where resistance from one individual outweighs all potential support in the group, the voting system degenerates such that only resistance scores carry decision-making value. This potentially denies a supermajority of individuals from pursuing their interests and forces them to vote dishonestly (only in terms of resistance), become more exclusive/exclusionary or leave. So the weighting factor must be greater than 1 and significantly less than the number of individuals. In smaller groups the weighting factor is likely to be higher and in larger groups it is likely to be lower.
      </p>
      <q-btn color="primary" @click="$refs.weightingInfo.close()">Close</q-btn>
    </q-modal>
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
        <div class="row">
          <q-select class="col-11" v-model="negativeScoreWeight"
            float-label="Negative Score Multiplier"
            :options="negativeMultipliers"
          />
          <div class="col-1 info">
            <q-icon @click="$refs.weightingInfo.open()" color="primary" name="fa-info" 
            ></q-icon>
          </div>
        </div>
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
import { date, uid, QAlert, QBtn, QCard, QCardMain, QCardMedia, QCardTitle, QChip, QField, QIcon, QInput, QInlineDatetime, QItem, QItemMain, QItemSide, QList, QModal, QSelect, QSlider } from 'quasar'
import { setTopic } from '@/data'
import { buildOutput } from '@/timer'

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
    QIcon,
    QInlineDatetime,
    QInput,
    QItem,
    QItemMain,
    QItemSide,
    QList,
    QModal,
    QSelect,
    QSlider
  },
  methods: {
    next () {
      let error = false
      // error check
      if (this.topicQuestion.replace(/\s/g, '').length <= 0) {
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
          'votingInterval': buildOutput(this.votingDays, this.votingHours, this.votingMinutes, 0),
          'description': this.description,
          'id': id,
          'proposals': {
            'Change Nothing': 'keep things the way they are',
            'Repeat Process': 'look for other options and repeat the process'
          },
          'negativeScoreWeight': this.negativeScoreWeight,
          'emojis': {
            'Change Nothing': 0,
            'Repeat Process': 0
          },
          'votes': {},
          'results': {}
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
      votingDays: 1,
      negativeScoreWeight: 3,
      negativeMultipliers: [
        {
          label: 'x1',
          value: 1
        },
        {
          label: 'x2',
          value: 2
        },
        {
          label: 'x3',
          value: 3
        },
        {
          label: 'x4',
          value: 4
        },
        {
          label: 'x5',
          value: 5
        },
        {
          label: 'x6',
          value: 6
        },
        {
          label: 'x7',
          value: 7
        },
        {
          label: 'x8',
          value: 8
        }
      ]
    }
  }
}
</script>
<style lang="stylus">
.info {
  margin auto
  cursor pointer
  text-align center
  font-size 14px
}
</style>
