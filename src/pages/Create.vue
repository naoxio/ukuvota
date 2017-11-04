<template>
  <ProcessLayout>
    <div style="max-width: 700px; text-align: left; padding: 1em;">
      <ULabel :value="$t('Topic.questionLabel')" />
      <UInput :value.sync="topicQuestion" :errorLabel="$t('Topic.errorLabel')" :error="topicMissing" />
      <NegativeScoreWeight :negativeScoreWeight.sync="negativeScoreWeight" />
      <UDatetime
        store="Proposal"
        :min="today"
        type="datetime"
        :durationLabel="$t('Proposal.duration')"
        :untilLabel="$t('Proposal.until')"
        />
      </br>
      <UDatetime
        store="Vote"
        :min="proposalDeadline"
        type="datetime"
        :durationLabel="$t('Voting.duration')"
        :untilLabel="$t('Voting.until')"
        />
      <!--TimeSelector :min="today" :label="$t('Proposal.time.selectLabel')" v-model="proposal" style="padding: 1em 0em 1em 0em" /-->
      <!--TimeSelector :min="getVoteMinDate()" :label="$t('Voting.time.selectLabel')" v-model="voting" /-->
      <UInput :value.sync="topicDescription" type="textarea" :float-label="$t('DescriptionLabel')" :max-height="50" :min-rows="7" />
      <div style="text-align: right">
        <UBtn :click="submit" icon="arrow forward">{{ $t('Next') }}</UBtn>
      </div>
      <div style="color: red; text-align: right" v-if="serverError">
        something went wrong. server down?
      </div>
    </div>
  </ProcessLayout>
</template>

<script>
  import ProcessLayout from 'layouts/ProcessLayout'
  import { setTopic, setProposal } from 'src/data'
  // import { buildOutput } from 'src/helpers/timer'
  import { UBtn, UInput, ULabel, UDatetime } from '@/general'
  import NegativeScoreWeight from '@/selectors/NegativeScoreWeight'
  import { mapState } from 'vuex'
  import { date, uid, scroll } from 'quasar'
  const { setScrollPosition } = scroll
  const { addToDate } = date
  const today = new Date()

  export default {
    components: {
      UBtn,
      UInput,
      ULabel,
      UDatetime,
      ProcessLayout,
      NegativeScoreWeight
    },
    mounted () {
      setScrollPosition(top, 0)
    },
    methods: {
      submit () {
        let error = false
        // error check
        if (this.topicQuestion.replace(/\s/g, '').length <= 0) {
          this.topicMissing = true
          error = true
          setScrollPosition(top, 0)
        }
        else {
          this.topicMissing = false
        }
  
        if (!error) { // if no errors proceed
          this.id = uid()
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
            '_id': this.id,
            'question': this.topicQuestion,
            'description': this.topicDescription,
            'proposalTime': endProposal,
            'votingTime': endVoting,
            'votingInterval': endVoting, // buildOutput(this.voting.days, this.voting.hours, this.voting.minutes, 0),
            'negativeScoreWeight': this.negativeScoreWeight,
            'proposals': { },
            'votes': { },
            'emojis': { }
          }
          let t = this
          setTopic(newTopic).then(log => {
            if (log === -1) t.serverError = true
            else {
              t.serverError = false
              setProposal(t.id, t.defaultP1).then(() => {
                setProposal(t.id, t.defaultP2).then(() => {
                  let id = t.id
                  t.$router.push({ name: 'collect', params: { id } })
                })
              })
            }
          })
        }
      }
    },
    computed: {
      ...mapState([
        'voteDeadline',
        'proposalDeadline'
      ]),
      voteDate () {
        let date = new Date()
        date.setDate(date.getDate() + 1)
        return date
      }
    },
    data () {
      return {
        id: '',
        today,
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
        defaultP1: {
          id: uid(),
          title: 'Status quo',
          description: 'keep things the way they are'
        },
        defaultP2: {
          id: uid(),
          title: 'Repeat process',
          description: 'reapeat the process and look for other options' }
      }
    }
  }
</script>
