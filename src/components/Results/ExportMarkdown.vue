<template>
  <q-btn @click="exportMd">
    Markdown
  </q-btn>
</template>
<script>
  import { mapState, mapGetters } from 'vuex'
  import FileSaver from 'file-saver'
  import { QBtn } from 'quasar'
  import { getResults, getAvgScore } from 'src/results'

  export default {
    components: {
      QBtn
    },
    methods: {
      exportMd () {
        let blob = new Blob([this.getRawData()], {type: 'text/plain'})
        FileSaver.saveAs(blob, 'data.md')
      },
      getRawData () {
        let output = `# ${this.topic.question}\n\n`
        output += `${this.topic.description}\n`

        const resultsAsObject = getResults(this.selectedVoters, this.proposals, this.votes, this.topic.negativeScoreWeight)
        const resultsAsList = Object.entries(resultsAsObject).map(([ id, score ]) => ({ id, score }))
        resultsAsList.sort((a, b) => b.score - a.score)

        resultsAsList.forEach(({ id }) => {
          output += `## ${this.proposals[id].title}\n`
          output += `_Average score: ${getAvgScore(id, resultsAsObject, this.selectedVoters)}_\n\n`
          if (this.proposals[id].description.length > 0) {
            output += `${this.proposals[id].description}\n\n`
          }
        })

        return output
      }
    },
    computed: {
      ...mapState([
        'topic'
      ]),
      ...mapGetters({
        selectedVoters: 'getSelectedVoters'
      }),
      proposals () {
        return this.topic && this.topic.proposals
      },
      votes () {
        return this.topic && this.topic.votes
      }
    }
  }
</script>
