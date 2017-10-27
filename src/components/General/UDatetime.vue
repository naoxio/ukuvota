<template>
  <q-input :value="getDateFormat(value)">
    <q-icon name="today">
      <q-popover ref="popover">
        <q-inline-datetime :min="min" v-model="value" :type="type">
          <q-btn @click="$refs.popover.close()">
            set
          </q-btn>
        </q-inline-datetime>
      </q-popover>
    </q-icon>
  </q-input>
</template>

<script>
  import { date, QBtn, QPopover, QIcon, QInput, QInlineDatetime } from 'quasar'

  export default {
    props: {
      type: String,
      min: Date,
      value: Date
    },
    methods: {
      getDateFormat (value) {
        value = date.formatDate(value, 'MM/DD HH:MM')
        return value
      }
    },
    components: {
      QBtn,
      QPopover,
      QIcon,
      QInlineDatetime,
      QInput
    }
  }
</script>
<style lang="stylus" scoped>

</style>
