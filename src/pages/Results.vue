<template>
  <process-layout>
    <u-card v-if="noResults">
      <NoResults />
    </u-card>
    <u-card nopad v-else>
      <q-tabs class="tabs" align="justify">
        <!-- Tabs - notice slot="title" -->
        <q-tab @click="ctx=false" default slot="title" name="tab-1" icon="tag faces" />
        <q-tab @click="ctx='table'"slot="title" name="tab-2" icon="view list" />
        <q-tab @click="ctx=false" slot="title" name="tab-3" icon="settings" />
            <!-- Targets -->
        <q-tab-pane name="tab-1">
          <EmojiView />
        </q-tab-pane>
        <q-tab-pane class="nopad" name="tab-2">
          <DataTable />
        </q-tab-pane>
        <q-tab-pane name="tab-3">
          <Settings />
        </q-tab-pane>
      </q-tabs>
    </u-card>
    <Export :canvas="ctx"/>
  </process-layout>
</template>
<script>
  import ProcessLayout from 'layouts/ProcessLayout'
  import UCard from '@/General/UCard'
  import DataTable from '@/Results/DataTable'
  import NoResults from '@/Results/NoVotes'
  import EmojiView from '@/Results/EmojiView'
  import Settings from '@/Results/Settings'
  import { QTabs, QTab, QTabPane } from 'quasar'
  import Export from '@/Results/Export'

  export default {
    components: {
      Export,
      ProcessLayout,
      UCard,
      DataTable,
      NoResults,
      EmojiView,
      Settings,
      QTabs,
      QTab,
      QTabPane
    },
    mounted () {
      this.id = this.$route.params.id
    },
    methods: {
  
    },
    data () {
      return {
        noResults: false,
        ctx: false
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .tabs
    max-width 700px
    margin 0
  .nopad
    padding 0
</style>
