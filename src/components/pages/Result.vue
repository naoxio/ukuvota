<template>
  <process-layout>

    <q-card style="max-width: 700px; text-align: left;">
      <q-card-main>
            saf
      
      </q-card-main>
    </q-card>
  </process-layout>
</template>
<script>
import ProcessLayout from '@/layouts/ProcessLayout'
import { QBtn, QCard, QCardMain, QField, QRadio } from 'quasar'
import { getVotes } from '@/data.js'

export default {
  components: {
    ProcessLayout,
    QBtn,
    QCard,
    QCardMain,
    QField,
    QRadio
  },
  mounted () {
    this.id = this.$route.params.id
    console.log(getVotes(this.id))
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
