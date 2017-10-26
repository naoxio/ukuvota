<template>
  <q-btn @click="click()" color="primary" flat>
    <div v-if="!icon === false">
      <q-icon :name="icon" />
    </div>
    <div v-if="!img === false">
      <img :src="img" :style="imgStyle" />
    </div>
    <q-tooltip :delay="tooltipDelay">
      {{ tooltip }}
    </q-tooltip>
  </q-btn>
</template>
<script>
  import { QBtn, QTooltip, QIcon, openURL } from 'quasar'

  export default {
    methods: {
      click () {
        if (!this.launch === false) openURL(this.launch)
        if (!this.route === false) this.$router.push({name: this.route})
      }
    },
    props: {
      btnStyle: { default: '' },
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
