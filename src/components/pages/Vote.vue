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
                <div class="selected" :id="'emo-' + key + '_' + file" @click="select(title, key, file)">
                  <img class="emo" :src="'statics/emo/' + file + '.svg'" height="32px" />
                </div>
              </div>
              <div v-else>
               <div :id="'emo-' + key + '_' + file" @click="select(title, key, file)">
                <img class="emo" :src="'statics/emo/' + file + '.svg'" height="32px" />
               </div>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <h6>
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
          <q-btn @click="next()" icon="arrow forward">Submit</q-btn>
        </div>
      </q-card-main>
    </q-card>
  </process-layout>
</template>
<script>
import ProcessLayout from '@/layouts/ProcessLayout'
import { QBtn, QCard, QCardMain, QField, QInput } from 'quasar'
import { getProposals, getEmojis, setEmojis, setVotes } from '@/data'

export default {
  components: {
    ProcessLayout,
    QBtn,
    QCard,
    QCardMain,
    QField,
    QInput
  },
  mounted () {
    this.id = this.$route.params.id
    this.proposals = getProposals(this.id)
    this.emojis = getEmojis(this.id)
  },
  methods: {
    getNameError () {
      if (this.nameExists) return 'This Name Already Exists'
      else if (this.nameEmpty) return 'Name is Empty'
    },
    select (title, key, val) {
      let values = [-3, -2, -1, 0, 1, 2, 3]
      document.getElementById('emo-' + key + '_' + val).setAttribute('class', 'selected')
      let index = values.indexOf(val)
      values.splice(index, 1)
      for (let x = 0; x < values.length; x++) {
        document.getElementById('emo-' + key + '_' + values[x]).removeAttribute('class', 'selected')
      }
      setEmojis(this.id, title, val, this.name)
    },
    next () {
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
        let error = setVotes(this.id, this.name)
        if (error === -2) this.nameExists = true
        else this.$router.push({name: 'result', params: { id: this.id }})
      }
    }
  },
  data () {
    return {
      proposals: '',
      radio: '1',
      group: 'upload',
      list: '',
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
