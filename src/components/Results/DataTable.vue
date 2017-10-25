<template>
<div>
  <table id="table" class="horizontal-seperator loose vertical-separator">
    <tr>
      <th class="text-center">{{ $t('Name.title') }}</th>
      <th class="text-center" v-for="(obj, id) in proposals" :key="id">
        <ULabel class="field" :hyperlink=true :value="obj.title" />
      </th> 
    </tr>
    <tr v-for="(object, name, index) in votes" :key="name">
      <td style="font-weight: bold" data-th="Name">
        <NameSelect :options="selection" :name="name"/>
      </td>
      <td v-for="(obj, id) in proposals" :key="id">
        <ULabel class="text-center" :value="getIndiScore(object, id)"/>
      </td> 
    </tr>
    <tr class="text-right t-right">
      <th class="text-left">{{ $t('Average') }}</th>
      <td v-for="(obj, id) in proposals" :key="id">
        <ULabel class="text-center" :value="getAvgScore(id)"/>
      </td>
    </tr>
    <tr class="text-right t-right">
      <th class="text-left">{{ $t('Total') }}</th>
      <td v-for="(obj, id) in proposals" :key="id">
        <ULabel class="text-center" :value="getScore(id)"/>
      </td>
    </tr>
  </table>
  <ExportImage element="table"/>
</div>
</template>
<script>
  import { QCheckbox, QIcon, QField, QModal, QScrollArea } from 'quasar'
  import NameSelect from '@/Select/Name'
  import ULabel from '@/General/ULabel'
  import ExportImage from '@/Content/ExportImage'
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
        return Math.round((this.res[proposal] / this.selection.length) * 100) * 0.01
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
      QCheckbox,
      QField,
      QModal,
      QIcon,
      QScrollArea,
      ExportImage
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


  table
    width 100%
    background-color white
  
  .padding
    padding 1em


</style>
