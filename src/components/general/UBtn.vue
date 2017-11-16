<template>
  <q-btn @click="pressed" :color="color" :flat="flat">
    <q-icon v-if="!icon === false" :name="icon" />
    <img v-if="!img === false" :src="img" :style="imgStyle" />
    <q-tooltip v-if="!tooltip === false" :delay="tooltipDelay">
      {{ tooltip }}
    </q-tooltip>
    <slot />
    <span v-if="!img === false && !text === false">&nbsp;</span>
    <span v-if="!text === false" style="font-size: 1.5em;">{{ text }}</span>
  </q-btn>
</template>
<script>
  import { QBtn, QTooltip, QIcon, openURL } from 'quasar'

  export default {
    methods: {
      pressed () {
        if (typeof this.click !== 'undefined') this.click(this.clickVar)
        if (!this.launch === false) openURL(this.launch)
        if (!this.route === false) this.$router.push({name: this.route})
      }
    },
    props: {
      btnStyle: { default: '' },
      click: { required: false },
      clickVar: { default: null },
      color: { default: 'primary' },
      flat: { default: true },
      launch: { default: false },
      route: { default: false },
      icon: { default: false },
      img: { default: false },
      imgStyle: { default: 'width: 32px' },
      text: { default: false },
      tooltip: String,
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
