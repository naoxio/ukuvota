<template>
  <process-layout>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <div v-for="(description, title, key) in proposals" :key="title">
          <h5><q-field :label="title"></q-field></h5>
          <q-field :label="description"></q-field>
          <div class="row justify-around">
            <div v-for="file in emo" :key="file">
              <div :class="{ selected: isSelected(file, title) }" @click="select(title, file)">
                <img class="emo" :src="'statics/emo/' + file + '.svg'" height="32px" />
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <h6>
          <template v-if="submited">
            <q-alert
              color="light"
              icon="done"
              dismissible
            >
              Vote from {{ submitName }} submited!
            </q-alert>
          </template>
          <q-field 
          label="Your Name or Persistant Alias"
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
          <q-btn @click="submit()" icon="arrow forward">Submit</q-btn>
        </div>
      </q-card-main>
    </q-card>
  </process-layout>
</template>
<script>
import ProcessLayout from '@/layouts/ProcessLayout'
import { QAlert, QBtn, QCard, QCardMain, QField, QInput } from 'quasar'
import { getTopic, setVotes } from '@/data'

export default {
  components: {
    ProcessLayout,
    QAlert,
    QBtn,
    QCard,
    QCardMain,
    QField,
    QInput
  },
  mounted () {
    this.id = this.$route.params.id
    getTopic(this.id).then(this.updateProposals)
    getTopic(this.id).then(this.updateEmojis)
  },
  methods: {
    updateProposals (topic) {
      this.proposals = topic.proposals
    },
    updateEmojis (topic) {
      this.tmpemojis = topic.emojis
    },
    isSelected (file, title) {
      if (file === this.tmpemojis[title]) return true
      else return false
    },
    getNameError () {
      if (this.nameExists) return 'This Name Already Exists'
      else if (this.nameEmpty) return 'Name is Empty'
    },
    select (title, val) {
      this.$set(this.tmpemojis, title, val)
      this.$forceUpdate()
    },
    submit () {
      let error = false
      // error check
      if (this.name === '') {
        this.nameEmpty = true
        error = true
      }
      else {
        this.nameEmpty = false
      }

      if (!error) { // if no errors proceed
        let tmp = this
        addVotes(this.id, this.name, this.tmpemojis).then(
          function () {
            tmp.nameExists = false
            tmp.submitName = tmp.name
            tmp.name = ''
            this.submited = true
            getTopic(tmp.id).then(tmp.updateEmojis).then(tmp.$forceUpdate())
          },
          function (error) {
            if (error === -2) this.nameExists = true
            else console.log('error: adding votes failed: ' + error)
          }
        )
      }
    }
  },
  data () {
    return {
      id: '',
      submited: false,
      submitName: '',
      proposals: '',
      emojis: '',
      tmpemojis: '',
      name: '',
      nameEmpty: false,
      nameExists: false,
      emo: [-3, -2, -1, 0, 1, 2, 3]
    }
  }
}
</script>
<style lang="styl">
.emo
  filter grayscale(1)

.emo:hover
  cursor pointer
  filter grayscale(0.5)

.selected
  .emo
  	filter grayscale(0)
</style>
