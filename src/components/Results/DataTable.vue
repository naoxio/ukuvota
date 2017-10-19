<template>
  <div>
    <div class="row padding">
      <q-btn @click="saveImage">
        {{ $t('SaveImage')}}
      </q-btn>
    </div>
    <div id="table">
      <div class="row red">
        <ULabel class="col-4 left" :value="$t('Name.title')"/>
        <div class="col-4" v-for="(obj, id) in proposals" :key="id">
          <ULabel :hyperlink=true :value="obj.title" />
        </div> 
      </div>
      <div v-for="(object, name, index) in votes" :key="name">
        <div class="row">
          <NameSelect class="col-4 left bold":options="selection" :name="name"/>
          <div class="col-4" v-for="(obj, id) in proposals" :key="id">
            <div>{{ getIndiScore(object, id) }}</div>
          </div> 
        </div>
      </div>
      <div class="row yellow bold">
        <div class="col-4 left">{{ $t('Average') }}</div>
        <div class="col-4" v-for="(obj, id) in proposals" :key="id">
          <div>{{ getAvgScore(id) }}</div>
        </div>
      </div>
      <div class="row yellow bold">
        <div class="col-4 left">{{ $t('Total') }}</div>
        <div class="col-4" v-for="(obj, id) in proposals" :key="id">
          <div>{{ getScore(id) }}</div>
        </div>
      </div>
  </div>
</div>

</template>

<script>
  import { QBtn, QCheckbox, QIcon, QField, QModal, QScrollArea } from 'quasar'
  import NameSelect from '@/Select/Name'
  import ULabel from '@/General/ULabel'
  import html2canvas from 'html2canvas'
  import canvasToImage from 'canvas-to-image'

export default {
    props: ['proposals', 'votes', 'negativeScore'],
    methods: {
      genResults (name) {
        for (let proposal in this.proposals) {
          let vote = this.votes[name][proposal]
          if (vote < 0) vote = vote * this.negativeScore
          if (this.res[proposal] === undefined) {
            this.res[proposal] = vote
          }
          else {
            this.res[proposal] = this.res[proposal] + vote
          }
        }
      },
      getAvgScore (proposal) {
        return this.res[proposal] / this.selection.length
      },
      getScore (proposal) {
        return this.res[proposal]
      },
      getIndiScore (object, proposal) {
        let score = object[proposal]
        if (score < 0) score = score * this.negativeScore
        return score
      },
      saveImage () {
        html2canvas(document.getElementById('table'), {
          onrendered: function (canvas) {
            let c = document.body.appendChild(canvas)
            console.log()
            c.id = 'canvas'

            canvasToImage('canvas', {
              name: 'results',
              type: 'jpg',
              quality: 0.7
            })
            document.body.removeChild(canvas)
          }
        })
      }
    },
    components: {
      NameSelect,
      ULabel,
      QBtn,
      QCheckbox,
      QField,
      QModal,
      QIcon,
      QScrollArea
    },
    mounted () {
      this.res = {}
      for (let x = 0; x < this.selection.length; x++) {
        this.genResults(this.selection[x])
      }
    },
    watch: {
      selection (newVal) {
        this.res = {}
        for (let x = 0; x < newVal.length; x++) {
          this.genResults(newVal[x])
        }
      },
      votes (v) {
        this.selection = Object.keys(v)
      }
    },
    data () {
      return {
        selection: Object.keys(this.votes),
        res: {}
      }
    }
  }
</script>

<style lang="stylus" scoped>
  #table
    background-color white
  .info
    cursor pointer
    font-size 14px
    display inline
    padding-left 10px

  .left
    text-align left 
    padding-left 1em

  .red
    background-color #FFEBEE

  .yellow
    background-color #ffffcc

  .bold
    font-weight: bold

  .padding
    padding 1em

</style>
