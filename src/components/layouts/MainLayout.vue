<template>
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
  >
    <div class="layout-view">
      <div class="layout-padding">
        <center>
          <div class="row justify-center items-center">
            <div class="col-auto">
              <img @dblclick="rotateLogoFast" @click="rotateLogoSlow" id="logo" src="statics/logo.png" width="128px" />
            </div>
            <div class="col-1"></div>
            <div class="col-auto">
              <p class="title">Ukuvota</p>
              <router-link :to="{ name: 'home' }">
                <q-icon name="fa-home"></q-icon>
              </router-link>
              <a href="https://douginamug.gitbooks.io/cooperative-decision-making-that-scales/content/" target="_blank">
                <q-icon name="fa-book"></q-icon>
              </a>
              <a href="https://gitlab.com/ukuvota/ukuvota/" target="_blank"><q-icon name="fa-gitlab"></q-icon></a>
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
    rotateLogo (animation) {
      document.getElementById('logo').setAttribute('class', animation + ' hide')
      if (!this.rotating) {
        this.rotating = true
        let t = this
        setTimeout(function () {
          document.getElementById('logo').setAttribute('class', 'show')
          t.rotating = false
        }, 10000)
      }
    },
    rotateLogoFast () {
      this.rotateLogo('fastanimation')
    },
    rotateLogoSlow () {
      this.rotateLogo('animation')
    },
    launch (url) {
      openURL(url)
    }
  },
  mounted () {
    this.$refs.layout.hideLeft()
  },
  data () {
    return {
      rotating: false
    }
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
  animation spin 4s linear infinite
.fastanimation
  animation spin 1s linear infinite
</style>
