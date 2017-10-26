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
        <Name :name="name"/>
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
        <ULabel class="text-center" :value="getTotalScore(id)"/>
      </td>
    </tr>
  </table>
</div>

</template>
<script>
  import Name from '@/Select/Name'
  import ULabel from '@/General/ULabel'
  import { mapState } from 'vuex'
  import { getResults, getAvgScore, getIndiScore, getTotalScore } from 'src/results'

  export default {
    components: {
      Name,
      ULabel
    },
    computed: {
      ...mapState([
        'proposals',
        'negativeScoreWeight',
        'votes',
        'selectedVoters'
      ])
    },
    methods: {
      genResults () { this.results = getResults(this.selectedVoters, this.proposals, this.votes, this.negativeScoreWeight) },
      getAvgScore (id) { return getAvgScore(id, this.results, this.selectedVoters) },
      getTotalScore (id) { return getTotalScore(id, this.results) },
      getIndiScore (object, proposal) { return getIndiScore(object, proposal, this.negativeScoreWeight) }
    },
    mounted () {
      if (this.selectedVoters.length > 0) this.genResults()
    },
    watch: {
      selectedVoters (val) {
        this.genResults()
      }
    },
    data () {
      return {
        results: {}
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
