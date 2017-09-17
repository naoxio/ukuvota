<template>
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
  >
    <div class="layout-view">
      <div class="layout-padding">
        <center>
          <img @dblclick="launch('https://yunity.org/ukuvota')" @click="rotateLogo" id="logo" src="statics/logo.png" width="128px" />
          <p class="title">Ukuvota</p>
          <a href="https://douginamug.gitbooks.io/cooperative-decision-making-that-scales/content/" target="_blank">
          <q-icon name="fa-book"></q-icon></a>
          <a href="https://gitlab.com/yunity/ukuvota/" target="_blank"><q-icon name="fa-gitlab"></q-icon></a>
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
    rotateLogo () {
      document.getElementById('logo').setAttribute('class', 'animation hide')
      setTimeout(function () {
        document.getElementById('logo').setAttribute('class', 'show')
      }, 10000)
     // document.getElementById('logo').setAttribute('class', 'show')
    },
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
.show {
  opacity: 1;
  transition: opacity 2s linear;
}

.hide {
  opacity: 0;
  transition: opacity 10s linear;
}
#logo {
  cursor pointer
}
.animation
  filter hue-rotate(300deg)
  animation spin 4s linear infinite
</style>
