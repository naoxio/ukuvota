<template>
  <process-layout>
    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
        <div v-for="(description, title, key) in proposals" :key="proposals.key">
          <h5><q-field :label="title"></q-field></h5>
          <q-field :label="description"></q-field>
          <div class="row justify-around">
            <div v-for="file in emo" :key="emo.key">
              <div v-if="file === emojis[title]">
                <div class="selected" :id="'emo-' + key + '_' + file" @click="select(key, file)">
                  <img class="emo" :src="'statics/emo/' + file + '.svg'" height="32px" />
                </div>
              </div>
              <div v-else>
               <div :id="'emo-' + key + '_' + file" @click="select(key, file)">
                <img class="emo" :src="'statics/emo/' + file + '.svg'" height="32px" />
               </div>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <h6><q-field label="Your Name or Persistant Alias"></q-field></h6>
        <q-input
          type="text"
          v-model="yourname"
        />
       </br>
        <div style="text-align: right">
          <q-btn @click="next()" icon="arrow forward">Submit</q-btn>
        </div>
      </q-card-main>
    </q-card>
  </process-layout>
</template>
<script>
import ProcessLayout from '@/layouts/ProcessLayout'
import { QAlert, QBtn, QCard, QCardMain, QField, QItem, QItemMain, QInput, QRadio } from 'quasar'
import { getProposals, getEmojis } from '@/data'

export default {
  components: {
    ProcessLayout,
    QAlert,
    QBtn,
    QCard,
    QCardMain,
    QField,
    QItem,
    QItemMain,
    QInput,
    QRadio
  },
  mounted () {
    this.id = this.$route.params.id
    this.proposals = getProposals(this.id)
    this.emojis = getEmojis(this.id)

    console.log(this.emojis)
  },
  methods: {
    select (key, val) {
      let values = [-3, -2, -1, 0, 1, 2, 3]
      document.getElementById('emo-' + key + '_' + val).setAttribute('class', 'selected')
      let index = values.indexOf(val)
      values.splice(index, 1)
      for (let x = 0; x < values.length; x++) {
        document.getElementById('emo-' + key + '_' + values[x]).removeAttribute('class', 'selected')
      }
    },
    next () {

    }
  },
  data () {
    return {
      proposals: '',
      radio: '1',
      group: 'upload',
      list: '',
      yourname: '',
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
