<template>
  <div>
    <div :class="row('red')">
      <ULabel class="col-4 left" :value="$t('Name.title')"/>
      <div class="col-4" v-for="(obj, id) in proposals" :key="id">
        <ULabel :hyperlink=true :value="obj.title" />
      </div> 
    </div>
    <div v-for="(object, name, index) in votes" :key="name">
      <div :class="row()">
        <NameSelect class="col-4 left" style="font-weight: bold" :options="selection" :name="name"/>
        <div class="col-4" v-for="(obj, id) in proposals" :key="id">
          {{ getIndiScore(object, id) }}
        </div> 
      </div>
    </div>
    <div :class="row('yellow')">
      <div class="col-4 left">{{ $t('Total') }}</div>
      <div class="col-4" v-for="(obj, id) in proposals" :key="id">
        {{ getScore(id) }}
      </div>
    </div>


</div>

</template>

<script>
  import { QBtn, QCheckbox, QIcon, QField, QModal, QScrollArea } from 'quasar'
  import NameSelect from '@/Select/Name'
  import ULabel from '@/General/ULabel'

  export default {
    props: ['proposals', 'votes', 'negativeScore'],
    methods: {
      row (extra) {
        return 'row justify-around items-center ' + extra
      },
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
      getScore (proposal) {
        return this.res[proposal]
      },
      getIndiScore (object, proposal) {
        let score = object[proposal]
        if (score < 0) score = score * this.negativeScore
        return score
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

table
  td
    height 64px
  th
    height 64px

</style>
