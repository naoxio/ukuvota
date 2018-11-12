<template>
  <span>
    <div class="col-1 info" @click="$refs.modal.open()">
      <q-icon color="primary" name="fa-bell" />
    </div>
    <q-modal ref="modal" :content-css="{padding: '50px', maxWidth: '700px'}">
      <p>
        You can use these commands to set up notifications in your Slack community.
      </p>
      <p>
        1. Enter the Slack channel to notify:
        <input v-model="channel" />
      </p>
      <p>
        2. Copy these commands into Slack and hit "enter":
      </p>
      <div
        v-for="({ message, command }) in slackReminderCommands"
        :key="message"
      >
        <small>{{ message }}</small>
        <textarea
          class="copy-box"
          readonly
          :value="command"
        />
      </div>
      <q-btn color="primary" @click="$refs.modal.close()">{{ $t('Close') }}</q-btn>
    </q-modal>
  </span>
</template>
<script>
  import { QBtn, QModal, QIcon } from 'quasar'
  import { mapGetters } from 'vuex'

  function addHours (date, h) {
    const t = new Date()
    t.setTime(date.getTime() + (h * 60 * 60 * 1000))
    return t
  }

  export default {
    components: {
      QBtn,
      QModal,
      QIcon
    },
    data () {
      return {
        channel: '#general'
      }
    },
    computed: {
      ...mapGetters({
        topic: 'getTopic'
      }),
      slackReminderCommands () {
        if (!this.topic || !this.topic.proposalTime || !this.topic.votingTime) return
        const command = '/remind'
        const url = window.location.href
        const prefix = this.topic.question
        return [
          /*
          {
            message: 'Proposal period just started',
            time: this.topic.proposalTime
          },
          */
          {
            message: 'Proposal period ends in 12 hours',
            time: addHours(this.topic.proposalTime, -12)
          },
          {
            message: 'Proposal period ends in 3 hours',
            time: addHours(this.topic.proposalTime, -3)
          },
          {
            message: 'Voting period just started',
            time: this.topic.proposalTime
          },
          {
            message: 'Voting period ends in 12 hours',
            time: addHours(this.topic.votingTime, -12)
          },
          {
            message: 'Voting period ends in 3 hours!',
            time: addHours(this.topic.votingTime, -3)
          },
          {
            message: 'Results for decision are available',
            time: this.topic.votingTime
          }
        ].map(r => {
          return {
            message: r.message,
            command: `${command} ${this.channel} "[${prefix}] ${r.message} -> ${url}" ${r.time.toLocaleString()}`
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
.copy-box
  width 600px
  max-width 100%
  cursor default
  font-size 80%
</style>
