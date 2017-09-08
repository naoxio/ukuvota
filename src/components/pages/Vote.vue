<template>
  <main-layout>

    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>

        <h5><q-field :label="topicQuestion"></q-field></h5>
        <q-field :label="topicDescription"></q-field>
        <div class="row justify-around">
          <img src="statics/1f47f.svg" height="32px" />
          <img src="statics/1f616.svg" height="32px" />
          <img src="statics/1f641.svg" height="32px" />
          <img src="statics/1f636.svg" height="32px" />
          <img src="statics/1f642.svg" height="32px" />
          <img src="statics/1f60a.svg" height="32px" />
          <img src="statics/1f60d.svg" height="32px" />
        </div>
        </br>
        <div class="row justify-around">
          <q-radio v-model="radio1" val="-3" color="red"/>
          <q-radio v-model="radio1" val="-2" color="secondary" style="margin-left: 10px" />
          <q-radio v-model="radio1" val="-1" color="secondary" style="margin-left: 10px" />
          <q-radio v-model="radio1" val="0" color="secondary" style="margin-left: 10px" />
          <q-radio v-model="radio1" val="1" color="secondary" style="margin-left: 10px" />
          <q-radio v-model="radio1" val="2" color="secondary" style="margin-left: 10px" />
          <q-radio v-model="radio1" val="3" color="secondary" style="margin-left: 10px" />
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
  ul.emoji-list * {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  ul.emoji-list li {
    font-size: 36px;
    float: left;
    display: inline-block;
    padding: 2px;
    margin: 4px;
  }
  img.emoji {
    cursor: pointer;
    height: 1em;
    width: 1em;
    margin: 0 .05em 0 .1em;
    vertical-align: -0.1em;
  }
</style>
