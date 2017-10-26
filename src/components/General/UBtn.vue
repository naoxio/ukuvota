<template>
  <q-btn @click="pressed" color="primary" flat>
    <q-icon v-if="!icon === false" :name="icon" />
    <img v-if="!img === false" :src="img" :style="imgStyle" />
    <q-tooltip v-if="!tooltip === false" :delay="tooltipDelay">
      {{ tooltip }}
    </q-tooltip>
  </q-btn>
</template>
<script>
  import { QBtn, QTooltip, QIcon, openURL } from 'quasar'

  export default {
    methods: {
      pressed () {
        if (typeof this.click !== 'undefined') this.click()
        if (!this.launch === false) openURL(this.launch)
        if (!this.route === false) this.$router.push({name: this.route})
      }
    },
    props: {
      btnStyle: { default: '' },
      click: { required: false },
      launch: { default: false },
      route: { default: false },
      icon: { default: false },
      img: { default: false },
      imgStyle: { defualt: {} },
      tooltip: { required: false },
      tooltipDelay: { default: 0 }
    },
    components: {
      QBtn,
      QTooltip,
      QIcon
    }
  }
</script>
<style lang="stylus" scoped>
  .q-tooltip
    margin-top 0.3em
</style>
