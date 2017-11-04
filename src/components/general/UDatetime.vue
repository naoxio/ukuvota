<template>
<div>
  <div class="row justify-between">
    <ULabel :value="durationLabel" />
    <ULabel class="sublabel" :value="duration" />
    <ULabel :value="untilLabel" />
    <ULabel class="sublabel" :value="date" />
  </div>
  <div class="row justify-between"> 
    <div class="row">
      <q-btn flat>today</q-btn>
      <q-btn flat>tomorrow</q-btn>
      <!--UWheelBtn :incrOptions="dayOptions" :incrValue="1"/-->
    </div> 
    <div class="row">
      <UBtn img="statics/icons/sunrise.svg" :tooltip="$t('Morning')" />
      <UBtn img="statics/icons/sun.svg" :tooltip="$t('Midday')" />
      <UBtn img="statics/icons/sunset.svg" :tooltip="$t('Evening')" />
      <!--UWheelBtn :incrOptions="hourOptions" :incrValue="1"/-->
    </div>
    <div>
      <q-icon color="primary" class="icon" name="today">
        <q-popover ref="popover">
         <q-inline-datetime :min="min" v-model="deadline" :type="type">
            <q-btn @click="$refs.popover.close()">
              {{ $t('Close') }}
            </q-btn>
          </q-inline-datetime>
        </q-popover>
      </q-icon>
    </div>
   </div>
  </div>
</template>

<script>
  import { QBtn, QPopover, QIcon, QInput, QInlineDatetime, QSelect } from 'quasar'
  import UWheelBtn from './UWheelBtn'
  import ULabel from './ULabel'
  import UBtn from './UBtn'
  export default {
    props: {
      type: String,
      min: Date,
      store: { required: true },
      untilLabel: String,
      durationLabel: String,
      changeLabel: String
    },
    watch: {
      deadline (val) { this.$store.dispatch(this.updDeadline + 'Sync', val) }
    },
    components: {
      UBtn,
      ULabel,
      UWheelBtn,
      QBtn,
      QPopover,
      QIcon,
      QInlineDatetime,
      QInput,
      QSelect
    },
    methods: {
      genLinearOptions (label, max) {
        let output = []
        for (let x = 1; x <= max; x++) {
          let l = x + ' ' + label
          output.push({ label: l, value: x })
        }
        return output
      },
      genFibOptions (label, max) {
        let output = []
        let a = 1, b = 1, temp

        while (a <= max) {
          temp = a
          let l = a + ' ' + label
          output.push({ label: l, value: a })
          a = a + b
          b = temp
        }
        return output
      }
    },

    computed: {
      date () { return this.$store.getters[this.getDeadlineFormatted] },
      duration () { return this.$store.getters[this.getDuration] },
      hourOptions () {
        return this.genLinearOptions('hour', 3)
      },
      dayOptions () {
        return this.genFibOptions('day', 55)
      }
    },
    data () {
      return {
        deadline: this.$store.getters['get' + this.store + 'Deadline'],
        updDeadline: 'update' + this.store + 'Deadline',
        getDeadline: 'get' + this.store + 'Deadline',
        getDeadlineFormatted: 'get' + this.store + 'DeadlineFormatted',
        getDuration: 'get' + this.store + 'Duration'
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .sublabel
    color grey
  .info
    padding 1em
    text-align center
    cursor default
  .icon
    cursor pointer
    font-size 1.5em


</style>
