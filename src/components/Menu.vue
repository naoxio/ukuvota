<template>
  <div class="row justify-center items-center content-stretch">
    <div class="item">
      <img @dblclick="rotateLogoFast" id="logo" src="statics/logo.png" width="92px" />
    </div>
    <div class="item">
      <p class="title">Ukuvota</p>
      <router-link :to="{ name: 'home' }">
        <q-icon name="fa-home"></q-icon>
      </router-link>
      <a href="https://douginamug.gitbooks.io/cooperative-decision-making-that-scales/content/" target="_blank">
        <q-icon name="fa-book"></q-icon>
      </a>
      <a href="https://gitlab.com/ukuvota/ukuvota/" target="_blank">
        <q-icon name="fa-gitlab"></q-icon>
      </a>
    </div>
    <div class="item">
      <lang-switcher style="width: 2em; height: 2em"></lang-switcher>
    </div>
  </div>
</template>

<script>
  import LangSwitcher from '@/LangSwitcher'

  import {
    QIcon
  } from 'quasar'
  
  export default {
    name: 'index',
    components: {
      LangSwitcher,
      QIcon
    },
    methods: {
      goHome () {
        this.$router.push({name: 'home'})
      },
      rotateLogo (animation) {
        if (this.$route.name.indexOf('home') === -1) this.goHome()
        else {
          document.getElementById('logo').setAttribute('class', animation + ' hide')
          if (!this.rotating) {
            this.rotating = true
            let t = this
            setTimeout(function () {
              document.getElementById('logo').setAttribute('class', 'show')
              t.rotating = false
            }, 10000)
          }
        }
      },
      rotateLogoFast () {
        this.rotateLogo('fastanimation')
      },
      rotateLogoSlow () {
        this.rotateLogo('animation')
      }
    },
    data () {
      return {
        rotating: false
      }
    }
  }
</script>

<style lang="stylus">
@media screen and (min-width: 600px)
  .item 
    width 200px
@media screen and (max-width: 600px)
  .item 
    width 130px
@media screen and (max-width: 440px)
  .item 
    width 120px
@media screen and (max-width: 400px)
  .item 
    width 88px
@media screen and (max-width: 280px)
  .item 
    width 80px
    font-size 0.8em
    img
      width 60px

.title
  font-size 1.8em

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

.animation
  animation spin 4s linear infinite

.fastanimation
  animation spin 1s linear infinite
</style>
