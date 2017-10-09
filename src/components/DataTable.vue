<template>
  <div>
    <q-btn @click="$refs.dataTable.open()">{{ $t('Results.viewRaw') }}</q-btn>
    <q-modal ref="dataTable">
      <table class="q-table horizontal-seperator loose flipped vertical-separator">
        <tr class="t-left">
          <th class="text-left red">{{ $t('Name.title') }}</th>
          <div v-for="(description, proposal) in proposals" :key="proposal">
            <th class="red" style="max-width: 150px; overflow-wrap: break-word;">
             <q-field :label="proposal" />
            </th>
          </div> 
        </tr>
        <div v-for="(object, name, index) in votes" :key="name">
          <tr class="t-center">
            <td class="red" style="font-weight: bold" data-th="Name">{{ name }}</td>
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
    QIcon,
    QField,
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
      QField,
      QModal,
      QIcon
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
