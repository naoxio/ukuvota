<template>
  <main-layout>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <q-field :error-label="$t('Topic.errorLabel')">
          <q-input v-model="topicQuestion" :float-label="$t('Topic.questionLabel')" :error="topicMissing" />
        </q-field>
        <div class="row">
          <q-select class="col-11" v-model="negativeScoreWeight" :float-label="$t('NegativeScoreMultiplier')" :options="negativeMultipliers" />
          <NegativeScoreInfo style="margin: auto; text-align: center" />
        </div>
        <TimeSelector 
          :label="$t('Proposal.time.selectLabel')"
          v-model="proposal"
         />
        <TimeSelector 
          :label="$t('Voting.time.selectLabel')"
          v-model="voting"
         />
        <q-input type="textarea" :float-label="$t('Topic.descriptionLabel')" v-model="description" :max-height="50" :min-rows="7" />
        <div style="text-align: right">
          <q-btn @click="next()" icon="arrow forward">{{ $t('Next') }}</q-btn>
        </div>
      </q-card-main>
    </q-card>
  </main-layout>
</template>

<script>
  import MainLayout from 'layouts/MainLayout'
  import TimeSelector from '@/TimeSelector'
  import NegativeScoreInfo from '@/NegativeScoreInfo'
  import { createNewTopic, getTopic } from 'src/data'
  // import { buildOutput } from 'src/timer'
  import {
  //  date,
    uid,
    QBtn,
    QCard,
    QCardMain,
    QChip,
    QField,
    QInput,
    QSelect,
    QSlider
  } from 'quasar'

  // const { addToDate } = date
  
  export default {
    components: {
      MainLayout,
      NegativeScoreInfo,
      TimeSelector,
      QBtn,
      QCard,
      QCardMain,
      QChip,
      QField,
      QInput,
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
          createNewTopic(id)
          getTopic(id).on((data, key) => {
            console.log(data.id)
          })
  
          let today = new Date()
          let endProposal = addToDate(today, {
            days: this.proposal.days,
            hours: this.proposal.hours,
            minutes: this.proposal.minutes
          })
          let diff = date.formatDate(endProposal, 'x') - date.formatDate(today, 'x')
          let endVoting = addToDate(today, {
            days: this.voting.days,
            hours: this.voting.hours,
            minutes: this.voting.minutes,
            milliseconds: diff
          })
  
          let tmp = this
          setTopic(newTopic).then(function () {
            // go to collect vue after saving topic data
            tmp.$router.push({
              name: 'collect',
              params: {
                id: id
              }
            })
          })
        }
      }
    },
    data () {
      return {
        description: '',
        topicQuestion: 'q',
        topicMissing: false,
        visible: false,
        proposal: {
          days: 2,
          hours: 0,
          minutes: 1
        },
        voting: {
          days: 1,
          hours: 0,
          minutes: 1
        },
        negativeScoreWeight: 3,
        negativeMultipliers: [{
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
