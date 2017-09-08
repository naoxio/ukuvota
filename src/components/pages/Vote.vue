<template>
  <main-layout>

    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>

        <h5><q-field :label="topicQuestion"></q-field></h5>
        <q-field :label="topicDescription"></q-field>
        <div class="row justify-around">
          <img src="statics/1f621.svg" height="32px" />
          <img src="statics/1f620.svg" height="32px" />
          <img src="statics/1f641.svg" height="32px" />
          <img src="statics/1f636.svg" height="32px" />
          <img src="statics/1f642.svg" height="32px" />
          <img src="statics/1f60a.svg" height="32px" />
          <img src="statics/2764.svg" height="32px" />
        </div>
        </br>
        <div class="row justify-around">
          <q-radio v-model="radio1" val="-3" color="red"/>
          <q-radio v-model="radio1" val="-2" color="red" style="margin-left: 10px" />
          <q-radio v-model="radio1" val="-1" color="secondary" style="margin-left: 10px" />
          <q-radio v-model="radio1" val="0" color="secondary" style="margin-left: 10px" />
          <q-radio v-model="radio1" val="1" color="secondary" style="margin-left: 10px" />
          <q-radio v-model="radio1" val="2" color="green" style="margin-left: 10px" />
          <q-radio v-model="radio1" val="3" color="green" style="margin-left: 10px" />
        </div>
      </q-card-main>
    </q-card>
  </main-layout>
</template>
<script>
import MainLayout from '@/layouts/MainLayout'
import { LocalStorage, QAlert, QBtn, QCard, QCardMain, QField, QRadio } from 'quasar'

export default {
  components: {
    MainLayout,
    QAlert,
    QBtn,
    QCard,
    QCardMain,
    QField,
    QRadio
  },
  methods: {
    loadData () {
      let topics = JSON.parse(LocalStorage.get.item('topics'))
      let index = -1
      for (let x = 0; x < topics.length; x++) {
        if (topics[x].id === this.$route.params.id) {
          index = x
        }
      }
      if (index === -1) {
        this.$router.push('/newTopic')
      }
      let tmp = topics[index]
      this.topicQuestion = tmp.topicQuestion
      this.topicDescription = tmp.description
      this.proposalTime = tmp.proposalTime
      this.votingTime = tmp.votingTime
      this.proposals = tmp.proposals
      this.id = tmp.id
      this.setProposalTimer()
      this.startIntervalUpdate()
      // this.$route.params.id
    }
  },
  mounted () {
    this.loadData()
  },
  data () {
    return {
      topicQuestion: 'hi',
      topicDescription: 'hi',
      radio1: 'two',
      radio2: 'one',
      radio3: 'three',
      group: 'upload',
      list: ''
    }
  }
}
</script>
<style lang="stylus">

</style>
