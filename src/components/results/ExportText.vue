<template>
  <u-btn :click="exportText" icon="description" :tooltip="$t('SaveText')" />
</template>
<script>
  import { mapState } from 'vuex'
  import FileSaver from 'file-saver'
  import UBtn from '@/general/UBtn'

  export default {
    components: {
      UBtn
    },
    methods: {
      exportText () {
        let blob = new Blob([this.getRawData()], {type: 'text/plain'})
        FileSaver.saveAs(blob, 'data.yml')
      },
      getRawData () {
        let output =
          this.$t('Topic.questionLabel') + ': ' + this.topic.question + '\n' +
          this.$t('Description') + ': ' + this.topic.description + '\n' +
          this.$t('NegativeScoreWeighting') + ': ' + this.topic.negativeScoreWeight + '\n' +
          this.$t('Proposals.title') + ': '
        for (let t in this.proposals) {
          output += this.proposals[t].title + ' '
        }
        output += '\n'
        for (let v in this.votes) {
          output += v + ': '
          for (let p in this.votes[v]) {
            let score = this.votes[v][p]
            if (score < 0) score *= this.topic.negativeScoreWeight
            output += score + ' '
          }
          output += '\n'
        }
        return output
      }
    },
    data () {
      return {
        ...mapState([
          'topic'
        ]),
        topic: this.$store.state.topic,
        proposals: this.$store.state.topic.proposals,
        votes: this.$store.state.topic.votes
      }
    }
  }
</script>
