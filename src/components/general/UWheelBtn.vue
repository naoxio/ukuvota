<template>
  <div class="row items-center">
    <q-select v-model="incrValue" :options="incrOptions"/>
    <div class="col">
      <q-btn @click="plus()" flat>
        <q-icon name="add" />
      </q-btn>
      </br>
      <q-btn @click="minus()" flat>
        <q-icon name="remove" />
      </q-btn>
    </div>
  </div>
</template>
<script>
  import { QBtn, QIcon, QSelect } from 'quasar'

  export default {
    props: {
      click: Function,
      incrValue: Number,
      incrOptions: Array,
      label: String

    },
    components: {
      QBtn,
      QIcon,
      QSelect
    },
    methods: {
      plus () {
        this.click(this.incr)
      },
      minus () {
        this.click(-this.incr)
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~variables'
  .q-btn
    padding 0
    margin 0 0.1em 0 0
    color $primary
    
  .q-if:before
    height 0
  .q-if:after
    height 0
    
  .q-icon
    font-size 1em
</style>
