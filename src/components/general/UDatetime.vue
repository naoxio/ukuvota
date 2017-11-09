<template>
<div>
  <div class="row justify-between">
    <div class="row no-wrap">
      <ULabel :value="durationLabel" />
      &nbsp;
      <ULabel class="sublabel" :value="duration" />
    </div>
    <div class="row no-wrap">
      <ULabel :value="untilLabel" />
      &nbsp;
      <ULabel class="sublabel" :value="date" />
    </div>
  </div>
  <div class="row justify-center"> 
	<div class="bg-primary">
	  <UBtn style="width: 100%; height: 100%" color="white" :tooltip="$t('Calendar')" icon="today"> 
        <q-popover ref="popover">
         <q-inline-datetime :min="min" v-model="deadline" :type="type">
            <q-btn @click="$refs.popover.close()">
              {{ $t('Close') }}
            </q-btn>
          </q-inline-datetime>
        </q-popover>
      </UBtn>
      </div>
	  <div v-for="(symbol, index) in symbols" class="bg-light">
		<UBtn class="text-white" :text="String(getDayInMonth(index))" imgStyle="margin: 0.2em 0; height: 1em" img="statics/datetime/cal.svg" :tooltip="getDayBtnLabel(symbol, index)" style="width: 100%; height: 100%" />
		<!--UBtn color="light" :tooltip="getDayBtnLabel(symbol, index)" :text="symbol" :flat="false"/-->
	  </div>
	  <div class="bg-primary">
        <!--UWheelBtn :incrOptions="dayOptions" :incrValue="1"/-->
        <UBtn img="statics/datetime/sunrise.svg" :tooltip="$t('Morning')"/>
        <UBtn img="statics/datetime/sun.svg" :tooltip="$t('Midday')"/>
        <UBtn img="statics/datetime/sunset.svg" :tooltip="$t('Evening')"/>
        <!--UWheelBtn :incrOptions="hourOptions" :incrValue="1"/-->
      </div>
    </div>
   </div>
  </div>
</template>

<script>
  import { QBtn, QPopover, QIcon, QInput, QInlineDatetime, QSelect } from 'quasar'
  import UWheelBtn from './UWheelBtn'
  import { addDays } from 'src/helpers/datefns'
  import ULabel from './ULabel'
  import UBtn from './UBtn'
  // const astro = ['☉', '☾', '♂', '☿', '♃', '♀', '♄']
  const nosym = ['0', '1', '2', '3', '4', '5', '6']
  const symbols = nosym
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
      getDayBtnLabel (symbol, day) {
        let output = this.getDayString(symbol) + ' - '
        if (day === 0) output += this.$t('Today')
        else if (day === 1) output += this.$t('Tomorrow')
        else return this.getDayString(symbol)
        return output
      },
      getDayInMonth (add) {
        return addDays(this.min, add).getDate()
      },
      getDayString (symbol) {
        switch (symbols.indexOf(symbol)) {
          case 0:
            return this.$t('Sunday')
          case 1:
            return this.$t('Monday')
          case 2:
            return this.$t('Tuesday')
          case 3:
            return this.$t('Wednesday')
          case 4:
            return this.$t('Thursday')
          case 5:
            return this.$t('Friday')
          case 6:
            return this.$t('Saturday')
        }
      },
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
      },
      today () {
        let d = new Date()
        return d.getDay()
      },
      symbols () {
        let sym = symbols
        let resort = sym.slice(0, this.today)
        sym = sym.slice(this.today)
        Array.prototype.push.apply(sym, resort)
        return sym
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
