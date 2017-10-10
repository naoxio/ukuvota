<template>
  <div>
    <q-btn @click="$refs.dataTable.open()">{{ $t('Results.viewRaw') }}</q-btn>
    <q-modal ref="dataTable">
      <table class="q-table horizontal-seperator loose flipped vertical-separator">
        <tr class="t-left">
          <th class="text-left red">{{ $t('Name.title') }}</th>
          <div v-for="(description, proposal) in proposals" :key="proposal">
            <th class="red" style="max-width: 150px; overflow-wrap: break-word;">
             <q-field :label="proposal" style="margin: 0"/>
            </th>
          </div> 
        </tr>
        <div v-for="(object, name, index) in votes" :key="name">
          <tr class="t-center">
            <td class="red" style="font-weight: bold" data-th="Name">
              <q-checkbox v-model="selection" :val="name" :label="name"/>
            </td>
            <div v-for="(description, proposal) in proposals" :key="proposal">
              <td :data-th="proposal" class="text-center"> {{ getIndiScore(object, proposal) }}</td>
            </div> 
          </tr>
        </div>
        <tr class="text-right t-right">
          <th class="red">{{ $t('Total') }}</th>
          <div v-for="(description, proposal) in proposals" :key="proposal">
            <td :data-th="proposal" class="text-center yellow"> {{ getScore(proposal) }}</td>
          </div>
        </tr>
      </table>
      <br/>
      <center>
        <q-btn color="primary" @click="$refs.dataTable.close()">{{ $t('Close') }}</q-btn>
      </center>
      <br />
    </q-modal>
  </div>
</template>

<script>
  import {
    QBtn,
    QCheckbox,
    QIcon,
    QField,
    QModal
  } from 'quasar'
  
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
      QBtn,
      QCheckbox,
      QField,
      QModal,
      QIcon
    },
    mounted () {
      this.res = {}
      console.log(Object.keys(this.votes))
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

<style lang="stylus">
.info
  cursor pointer
  font-size 14px
  display inline
  padding-left 10px

.t-left
  margin-left auto

.t-right
  margin-right auto

</style>
