<template>
  <div>
    <q-btn @click="$refs.dataTable.open()">{{ $t('Results.viewRaw') }}</q-btn>
    <q-modal ref="dataTable">
        <table class="q-table horizontal-seperator loose flipped vertical-separator">
          <thead>
          <tr>
            <th class="text-left red">Name</th>
            <div v-for="(description, proposal) in proposals" :key="proposal">
              <th class="red" style="max-width: 150px; overflow-wrap: break-word;">{{ proposal }}</th>
            </div> 
          </tr>
        </thead>
        <tbody>
          <div v-for="(object, name, index) in votes" :key="name">
            <tr>
              <td class="red" style="font-weight: bold" data-th="Name">{{ name }}</td>
              <div v-for="(description, proposal) in proposals" :key="proposal">
                <td :data-th="proposal" class="text-center"> {{ getIndiScore(object, proposal) }}</td>
              </div> 
            </tr>
          </div>
        </tbody>
        <tfood>
          <tr class="text-right">
            <th class="red">Total</th>
            <div v-for="(description, proposal) in proposals" :key="proposal">
              <td :data-th="proposal" class="text-center yellow"> {{ getScore(proposal) }}</td>
            </div>
          </tr>
        </tfood>
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
    QIcon,
    QModal
  } from 'quasar'
  
  export default {
    props: ['proposals', 'votes', 'results', 'negativeScore'],
    methods: {
      getScore (proposal) {
        return this.results[proposal]
      },
      getIndiScore (object, proposal) {
        let score = object[proposal]
        if (score < 0) score = score * this.negativeScore
        return score
      }
    },
    components: {
      QBtn,
      QModal,
      QIcon
    }
  }
</script>

<style lang="stylus">
.info {
  cursor pointer
  font-size 14px
  display inline
  padding-left 10px
}
</style>
