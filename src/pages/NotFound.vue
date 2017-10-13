<template>
  <main-layout>
    {{ $t('Topic.notFound', { id }) }}
    <br/><br/>
    <q-btn @click="goHome()" >
      <q-icon color="primary" name="home" />
    </q-btn>
  </main-layout>
</template>
<script>
import MainLayout from 'layouts/MainLayout'
import { QBtn, QIcon } from 'quasar'

export default {
  components: {
    MainLayout,
    QBtn,
    QIcon
  },
  methods: {
    goHome () {
      this.$router.push({ name: 'home' })
    }
  },
  data () {
    return {
      id: this.$route.params.id
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
