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
import { QAlert, QBtn, QCard, QCardMain, QField, QRadio } from 'quasar'

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
