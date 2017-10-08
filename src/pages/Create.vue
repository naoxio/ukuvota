<template>
  <main-layout>
    <div style="max-width: 700px; text-align: left; padding: 1em;">
        <p>{{ $t('Topic.questionLabel') }}</p>
        <p id="top"/>
        <HyperInput :value.sync="topicQuestion" :errorLabel="$t('Topic.errorLabel')" :error="topicMissing" />
        <div class="row">
          <q-select class="col-11" v-model="negativeScoreWeight" :float-label="$t('NegativeScoreWeighting')" :options="negativeMultipliers" />
          <NegativeScoreInfo style="margin: auto; text-align: center" />
        </div>
        <TimeSelector 
          :label="$t('Proposal.time.selectLabel')"
          v-model="proposal"
          style="padding: 1em 0em 1em 0em"
        />
        <TimeSelector 
          :label="$t('Voting.time.selectLabel')"
          v-model="voting"
        />
        <HyperInput :value.sync="topicDescription" type="textarea" :float-label="$t('DescriptionLabel')" :max-height="50" :min-rows="7" />
        <div style="text-align: right">
          <q-btn @click="submit" icon="arrow forward">{{ $t('Next') }}</q-btn>
        </div>
        <div style="color: red; text-align: right" v-if="serverError">
          something went wrong. server down?
        </div>
    </div>
  </main-layout>
</template>

<script>
  import MainLayout from 'layouts/MainLayout'
  import TimeSelector from '@/TimeSelector'
  import NegativeScoreInfo from '@/NegativeScoreInfo'
  import { setTopic } from 'src/data'
  import { buildOutput } from 'src/timer'
  import HyperInput from '@/HyperInput'

  import {
    date,
    uid,
    scroll,
    QBtn,
    QCard,
    QCardMain,
    QChip,
    QField,
    QInput,
    QSelect,
    QSlider
  } from 'quasar'

  const { setScrollPosition } = scroll

  const { addToDate } = date
  
  export default {
    components: {
      HyperInput,
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
    mounted () {
      setScrollPosition(top, 0)
    },
    methods: {
      submit () {
        console.log(this.topicDescription)
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
          // calculate when the proposal collection time ends
          let endProposal = addToDate(today, {
            days: this.proposal.days,
            hours: this.proposal.hours,
            minutes: this.proposal.minutes
          }).toString()
          let diff = date.formatDate(endProposal, 'x') - date.formatDate(today, 'x')
          let endVoting = addToDate(today, {
            days: this.voting.days,
            hours: this.voting.hours,
            minutes: this.voting.minutes,
            milliseconds: diff
          }).toString()

          let newTopic = {
            '_id': id,
            'question': this.topicQuestion,
            'description': this.topicDescription,
            'proposalTime': endProposal,
            'votingTime': endVoting,
            'votingInterval': buildOutput(this.voting.days, this.voting.hours, this.voting.minutes, 0),
            'negativeScoreWeight': this.negativeScoreWeight,
            'proposals': {
              'Status quo': 'keep things the way they are',
              'Repeat process': 'reapeat the process and look for other options'
            },
            'emojis': {
              'Status quo': 0,
              'Repeat process': 0
            },
            'votes': {
  
            }
          }
          let t = this
          setTopic(newTopic).then(log => {
            if (log === -1) this.serverError = true
            else {
              this.serverError = false
              t.$router.push({ name: 'collect', params: { id } })
            }
          })
        }
      }
    },
    data () {
      return {
        topicDescription: '',
        topicQuestion: '',
        topicMissing: false,
        visible: false,
        serverError: false,
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
        },
        {
          label: '∞ (' + this.$t('SystemicConsensus') + ')',
          value: 'infinity'
        }
        ]
      }
    }
  }
</script>
