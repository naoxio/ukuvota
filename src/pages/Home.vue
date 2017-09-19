<template>
  <main-layout>
    <div style="max-width: 700px; text-align: left;">
      <MarkdownContent name="summary" />
      <center>
        <router-link :to="{ name: 'app' }">
          <q-btn>Start Web App</q-btn>
        </router-link>
      </center>
    </div>
  </main-layout>
</template>
<script>
import MainLayout from 'layouts/MainLayout'
import { QBtn, QCard, QCardMain, QField, QItem, QItemMain } from 'quasar'
import MarkdownContent from '@/Content'
export default {
  components: {
    MarkdownContent, MainLayout, QBtn, QCard, QCardMain, QField, QItem, QItemMain
  }
}

</script>
<style lang="stylus">
li
  margin 0 0 1em 0
</style>
