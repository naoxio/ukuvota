<template>
  <main-layout>
    <div style="max-width: 700px; text-align: left;">
      <div style="text-align: center">
        <img @dblclick="rotateLogo" id="logo" src="statics/logo.png" width="92px" />
        <p class="title">Ukuvota</p>
      </div>
      <br/>
      <MarkdownContent name="summary" />
      <center>
        <br/>
        <q-alert color="light">{{ $t('Disclaimer') }}</q-alert>
        <br/>
        <router-link :to="{ name: 'create' }">
          <q-btn>{{ $t('StartWebApp') }}</q-btn>
        </router-link>
      </center>
    </div>
  </main-layout>
</template>
<script>
import MainLayout from 'layouts/MainLayout'
import { QAlert, QBtn, QCard, QCardMain, QField, QItem, QItemMain } from 'quasar'
import MarkdownContent from '@/MarkdownContent'

export default {
  components: {
    MarkdownContent, MainLayout, QAlert, QBtn, QCard, QCardMain, QField, QItem, QItemMain
  },
  methods: {
    rotateLogo () {
      document.getElementById('logo').setAttribute('class', 'animation hide')
      if (!this.rotating) {
        this.rotating = true
        let t = this
        setTimeout(function () {
          document.getElementById('logo').setAttribute('class', 'show')
          t.rotating = false
        }, 10000)
      }
    }
  }
}

</script>
<style lang="stylus">
li
  margin 0 0 1em 0

@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }

.show
  opacity 1
  transition opacity 2s linear

.hide
  opacity 0
  transition opacity 10s linear

.quickhide
  opacity 0
  transition opacity 1s linear

#logo
  cursor pointer

.title
  font-size 1.8em

.animation
  animation spin 1s linear infinite
</style>
