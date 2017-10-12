<template>
  <process-layout>
    <ProcessCard v-if="votesExist()" >
      <h5><ULabel :value="$t('Voted.list')" /></h5>
      </br>
      <NameList :votes="votes"/>
    </ProcessCard>
    <ProcessCard>
      <EmojiVoteList
        :proposals="proposals"
        :tmpemojis="tmpemojis"
        @update:tmpemojis="obj => updateEmo(obj)"
        />
      <br></br>
      <template v-if="submitted">
        <q-alert
          color="light"
          icon="done"
          dismissible
          >
          <q-item-main :label="$t('Vote.added', { submitName })" />
        </q-alert>
      </template>
      <h6>
        <q-field 
          :label="$t('Name.label')"
          :error-label="getNameError()"
          >
          <q-input
            type="text"
            v-model="name"
            :error="nameExists || nameEmpty"
            />
        </q-field>
      </h6>
      </br>
      <div style="text-align: right">
        <q-btn @click="submit()" icon="arrow forward">{{ $t('Submit') }}</q-btn>
      </div>
    </ProcessCard>
  </process-layout>
</template>
<script>
import ProcessLayout from 'layouts/ProcessLayout'
import ProcessCard from 'layouts/ProcessCard'

import { QAlert, QBtn, QField, QInput, QItemMain } from 'quasar'
import { getTopic, setVotes } from 'data'
import NameList from '@/NameList'
import EmojiVoteList from '@/EmojiVoteList'
import ULabel from '@/ULabel'

export default {
  components: {
    EmojiVoteList,
    ProcessLayout,
    ProcessCard,
    NameList,
    ULabel,
    QAlert,
    QBtn,
    QField,
    QInput,
    QItemMain
  },
  mounted () {
    this.id = this.$route.params.id
    getTopic(this.id).then(this.getData)
  },
  methods: {
    updateEmo (obj) {
      this.tmpemojis[obj.id] = obj.val
    },
    votesExist () {
      if (Object.keys(this.votes).length > 0) return true
      else return false
    },
    getData (topic) {
      this.proposals = topic.proposals
      this.tmpemojis = topic.emojis
      this.votes = topic.votes
      if (topic.negativeScoreWeight === 'infinity') {
        this.emo = [-3, -2, -1, 0]
      }
    },
    getNameError () {
      if (this.nameExists) return this.$t('Name.exists')
      else if (this.nameEmpty) return this.$t('Name.empty')
    },

    submit () {
      let error = false
      // error check
      if (this.name.replace(/\s/g, '').length <= 0) {
        this.nameEmpty = true
        error = true
      }
      else {
        this.nameEmpty = false
      }

      if (!error) { // if no errors proceed
        let tmp = this

        setVotes(this.id, this.name, this.tmpemojis).then(log => {
          if (log === -2) tmp.nameExists = true
          else tmp.nameExists = false
          tmp.submitName = tmp.name
          tmp.name = ''
          tmp.submitted = true
          getTopic(tmp.id).then(tmp.getData).then(tmp.$forceUpdate())
        })
      }
    }
  },
  data () {
    return {
      id: '',
      submitted: false,
      submitName: '',
      proposals: '',
      emojis: '',
      tmpemojis: '',
      name: '',
      nameEmpty: false,
      nameExists: false,
      votes: ''
    }
  }
}
</script>
