<template>
  <main-layout>
    <div style="max-width: 700px; text-align: left;">
      <MarkdownContent name="summary" />
      <center>
        <br/>
        <q-alert color="light">Disclaimer: This is just a prototype, there is no guarantee while using the web app. Do not add any confidential data!</q-alert>
        <br/>
        <router-link :to="{ name: 'app' }">
          <q-btn>{{ $t('StartWebApp') }}</q-btn>
        </router-link>
      </center>
    </div>
  </main-layout>
</template>
<script>
import MainLayout from 'layouts/MainLayout'
import { QAlert, QBtn, QCard, QCardMain, QField, QItem, QItemMain } from 'quasar'
import MarkdownContent from '@/Content'
export default {
  components: {
    MarkdownContent, MainLayout, QAlert, QBtn, QCard, QCardMain, QField, QItem, QItemMain
  }
}

</script>
<style lang="stylus">
li
  margin 0 0 1em 0
</style>
