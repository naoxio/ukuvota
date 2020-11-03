<template>
  <div>
    <h6><ULabel :value="$t('Voters')" /></h6>
    <NameList />
    </br>
    <div class="row justify-between">
      <h6><ULabel :value="$t('Results.title')"/></h6>
      <div v-if="resHover.avg">
        {{ $t('Average') }}
      </div>
      <div v-if="resHover.total">
        {{ $t('Total') }}
      </div>
      <!--q-checkbox v-model="highlightTopScores" :label="$t('HighlightTopScores')" /-->
    </div>
    <div v-if="selectedVoters.length > 0">
      <div v-for="(value, id) in sortedResults" :key="id">
        <div :class="{ topProposal: getTotalEmoji(id) === 3, highlightTopScores: highlightTopScores && getTotalEmoji(id) === 3}">
          <div class="list row justify-between items-center">
            <div class="col">
              <ULabel :hyperlink="true" :value="getTitle(id)" />
              <ULabel class="sublabel" :hyperlink="true" :value="getDescription(id)" markdown />
            </div>
            <div class="col-auto">
              <q-tooltip v-if="!resHover.none">
                <div v-if="resHover.avg">
                  {{ $t('Average') }}: {{ getAvgRoundedScore(id) }}
                </div>
                <div v-if="resHover.total">
                  {{ $t('Total') }}: {{ getTotalScore(id) }}
                </div>
              </q-tooltip>
              <div class="text-center" style="border: 1px solid; padding: 4px; margin-left: 2px">
                {{ resHover.avg ? getAvgRoundedScore(id) : '' }}
                {{ resHover.total ? getTotalScore(id) : '' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      {{ $t('Select.voters') }}
    </div>
  </div>
</template>

<script>
  import { QCheckbox, QTooltip } from 'quasar'
  import ULabel from '@/General/ULabel'
  import UEmoji from '@/General/UEmoji'
  import NameList from '@/List/Names'
  import { mapState, mapGetters } from 'vuex'
  import { getOrderedList, getResults, getAvgScore, getAvgRoundedScore, getTotalScore, getIndiScore, getAvgEmoji, getTotalEmoji } from 'src/results'

  export default {
    components: {
      QCheckbox,
      QTooltip,
      ULabel,
      NameList,
      UEmoji
    },
    computed: {
      ...mapState([
        'proposals',
        'negativeScoreWeight',
        'votes',
        'resHover'
      ]),
      ...mapGetters({
        selectedVoters: 'getSelectedVoters'
      })
    },
    watch: {
      selectedVoters (val) {
        if (val.length > 0) {
          this.update()
        }
      }
    },
    mounted () {
      if (this.selectedVoters.length > 0) this.update()
      if (this.negativeScore === 'infinity') this.negativeScore = 1
      else this.negativeScore = this.negativeScore
    },
    methods: {
      update () {
        this.genResults()
        this.orderList()
      },
      genResults () { this.results = getResults(this.selectedVoters, this.proposals, this.votes, this.negativeScoreWeight) },
      orderList () {
        let list = getOrderedList(this.results)
        if (list === -1) this.noResults = true
        else this.sortedResults = list
      },
      getAvgScore (id) { return getAvgScore(id, this.results, this.selectedVoters) },
      getTotalScore (id) { return getTotalScore(id, this.results) },
      getIndiScore (object, id) { return getIndiScore(object, id, this.negativeScore) },
      getAvgRoundedScore (id) { return getAvgRoundedScore(id, this.results, this.selectedVoters) },
      getDescription (id) { return this.proposals[id].description },
      getTitle (id) { return this.proposals[id].title },
      getAvgEmoji (id) { return getAvgEmoji(id, this.negativeScore, this.getAvgScore(id)) },
      getTotalEmoji (id) { return getTotalEmoji(id, this.negativeScore, this.results, this.votes) },
      getEmoji (id) {
        if (this.getAverage) {
          return this.getAvgEmoji(id)
        }
        else return this.getTotalEmoji(id)
      }
    },
    data () {
      return {
        highlightTopScores: true,
        getAverage: true,
        results: {},
        sortedResults: {},
        negativeScore: 3
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .pointer
    cursor pointer

  .caption
    text-align left
    font-size 1.2em

  .list
    text-align left
    padding 0.2em

  .sublabel
    color grey

  .topProposal
    font-weight bold

  .highlightTopScores
    background-color #ffffcc
    margin -0.5em
    padding 0.5em
</style>
