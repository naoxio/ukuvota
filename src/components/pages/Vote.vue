<template>
  <main-layout>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <h5><q-field :label="topic.question"></q-field></h5>
        <q-field :label="topic.description"></q-field>
        <q-item tag="label">
          <q-item-main label="Voting Time Ends In" sublabel="votingTimer">          </q-item-main>
        </q-item>
      </q-card-main>
    </q-card>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <div v-for="(description, title, key) in topic.proposals" :key="topic.proposals.key">
          <h5><q-field :label="title"></q-field></h5>
          <q-field :label="description"></q-field>
          <div class="row justify-around">
            <div :id="'emo-' + key + '_-3'" class="selected" @click="select(key, -3)">
              <img class="emo" src="statics/1f621.svg" height="32px" />
            </div>
            <div :id="'emo-' + key + '_-2'" @click="select(key, -2)">
              <img class="emo"  src="statics/1f620.svg" height="32px" />
            </div>
            <div :id="'emo-' + key + '_-1'" @click="select(key, -1)">
              <img class="emo"  src="statics/1f641.svg" height="32px" />
            </div>
            <div :id="'emo-' + key + '_0'" @click="select(key, 0)">
              <img class="emo"  src="statics/1f636.svg" height="32px" />
            </div>
            <div :id="'emo-' + key + '_1'" @click="select(key, 1)">
              <img class="emo"  src="statics/1f642.svg" height="32px" />
            </div>
            <div :id="'emo-' + key + '_2'" @click="select(key, 2)">
              <img class="emo"  src="statics/1f60a.svg" height="32px" />
            </div>
            <div :id="'emo-' + key + '_3'" @click="select(key, 3)">
              <img class="emo"  src="statics/2764.svg" height="32px" />
            </div>
          </div>
        </div>

      </q-card-main>
    </q-card>
  </main-layout>
</template>
<script>
import MainLayout from '@/layouts/MainLayout'
import { QAlert, QBtn, QCard, QCardMain, QField, QItem, QItemMain, QRadio } from 'quasar'
import { loadTopic } from '@/data'

export default {
  components: {
    MainLayout,
    QAlert,
    QBtn,
    QCard,
    QCardMain,
    QField,
    QItem,
    QItemMain,
    QRadio
  },
  mounted () {
    this.topic = loadTopic(this.$route.params.id)
    if (this.topic === '-1') {
      this.$router.push('/newTopic')
    }
    console.log(this.topic.proposals)
  },
  methods: {
    select (key, val) {
      let values = [-3, -2, -1, 0, 1, 2, 3]
      document.getElementById('emo-' + key + '_' + val).setAttribute('class', 'selected')
      console.log(val)
      let index = values.indexOf(val)
      values.splice(index, 1)
      console.log(values)
      for (let x = 0; x < values.length; x++) {
        document.getElementById('emo-' + key + '_' + values[x]).removeAttribute('class', 'selected')
      }
    }
  },
  data () {
    return {
      topic: '',
      radio: '1',
      group: 'upload',
      list: ''
    }
  }
}
</script>
<style lang="styl">
@import '~variables'
img:hover
  cursor pointer

.selected
  .emo
  	filter grayscale(0)

.emo
	filter grayscale(1)
</style>
