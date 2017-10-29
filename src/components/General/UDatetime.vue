<template>
  <div>
    <q-input :stack-label="label" v-model="date" :value="date">
      <q-icon name="today">
        <q-popover ref="popover">
          <q-inline-datetime :min="min" v-model="value" :type="type">
            <q-btn @click="$refs.popover.close()">
              {{ $t('Close') }}
            </q-btn>
          </q-inline-datetime>
        </q-popover>
      </q-icon>
    </q-input>
  </div>
</template>

<script>
  import { QBtn, QPopover, QIcon, QInput, QInlineDatetime, QSelect } from 'quasar'
  export default {
    props: {
      type: String,
      min: Date,
      store: { required: true },
      label: String
    },
    watch: {
      date (val) { this.value = this.$store.getters[this.getFnc] },
      value (val) { this.$store.dispatch(this.updFnc, val) }
    },
    computed: {
      date () { return this.$store.getters[this.getFormatted] }
    },
    components: {
      QBtn,
      QPopover,
      QIcon,
      QInlineDatetime,
      QInput,
      QSelect
    },
    data () {
      return {
        value: this.$store.getters['get' + this.store],
        updFnc: 'update' + this.store,
        getFormatted: 'get' + this.store + 'Formatted',
        getFnc: 'get' + this.store,
        selectedMonth: 11
      }
    }
  }
</script>
<style lang="stylus" scoped>

</style>
