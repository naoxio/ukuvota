<template>
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
  >
    <!--div slot="left">
      <q-list no-border link inset-delimiter>
        <q-list-header>Essential Links</q-list-header>
        <q-item @click="launch('http://quasar-framework.org')">
          <q-item-side icon="school" />
          <q-item-main label="Docs" sublabel="quasar-framework.org" />
        </q-item>
        <q-item @click="launch('http://forum.quasar-framework.org')">
          <q-item-side icon="record_voice_over" />
          <q-item-main label="Forum" sublabel="forum.quasar-framework.org" />
        </q-item>
        <q-item @click="launch('https://gitter.im/quasarframework/Lobby')">
          <q-item-side icon="chat" />
          <q-item-main label="Gitter Channel" sublabel="Quasar Lobby" />
        </q-item>
        <q-item @click="launch('https://twitter.com/quasarframework')">
          <q-item-side icon="rss feed" />
          <q-item-main label="Twitter" sublabel="@quasarframework" />
        </q-item>
      </q-list>
    </div-->

    <div class="layout-view">
      <div class="layout-padding">
        <center>
        <div class="row justify-center items-center">
          <div class="col-6">
            <p class="title">Ukuvota</p>
            <a href="https://douginamug.gitbooks.io/cooperative-decision-making-that-scales/content/" target="_blank">
            reference</a><br>
            <a href="https://gitlab.com/yunity/ukuvota/" target="_blank">source</a>
          </div>
          <div class="col-6">
            <a href="https://yunity.org" target="_blank">
              <img class="logo" src="statics/logo.png" width="128px" />
            </a>  
          </div>
        </div>
        <br></br>
        <slot></slot>
        </center>
      </div>
    </div>

    <div slot="footer">
      <slot name="app-footer"></slot>
    </div>
  </q-layout>
</template>

<script>
import {
  openURL,
  QLayout,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain
} from 'quasar'

export default {
  name: 'index',
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain
  },
  methods: {
    launch (url) {
      openURL(url)
    }
  },
  mounted () {
    this.$refs.layout.hideLeft()
  }
}
</script>

<style lang="stylus">
body
  font-family 'coolFont'
.title
  font-size 32px

@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }

.logo:hover
  cursor pointer
  animation spin 4s linear infinite
  filter hue-rotate(300deg)
</style>
