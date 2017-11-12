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
        <ULabel class="sublabel" :value="caldate" />
      </div>
      <div class="row"> 
        <div class="bg-primary">
          <UBtn
            style="width: 100%; height: 100%"
            color="white"
            :tooltip="$t('DatePicker')"
            icon="today"> 
            <q-popover ref="date">
              <q-inline-datetime :min="min" v-model="deadline" type="date">
                <q-btn @click="$refs.date.close()">
                  {{ $t('Close') }}
                </q-btn>
              </q-inline-datetime>
            </q-popover>
          </UBtn>
        </div>
	      <div v-for="day in 7" :key="day" class="bg-light">
		      <UBtn
            class="text-white"
            :text="String(getDayInMonth(day - 1))"
            :imgStyle="getBtnImgTextStyle()"
            img="statics/datetime/cal.svg"
            :tooltip="getDayString(day - 1)"
            style="width: 100%; height: 100%" />
            <!--UBtn color="light" :tooltip="getDayBtnLabel(symbol, index)" :text="symbol" :flat="false"/-->
        </div>
      </div>
      <div class="row">
        <div class="bg-primary">
          <UBtn
            style="width: 100%; height: 100%"
            color="white"
            :tooltip="$t('TimePicker')"
            icon="access time"> 
            <q-popover ref="time">
              <q-inline-datetime :min="min" v-model="deadline" type="time">
                <q-btn @click="$refs.time.close()">
                  {{ $t('Close') }}
                </q-btn>
              </q-inline-datetime>
            </q-popover>
          </UBtn>
        </div>
        <div v-for="hour in 3" :key="hour" class="bg-light">
          <!--UWheelBtn :incrOptions="dayOptions" :incrValue="1"/-->
          
          <UBtn class="text-white" :imgStyle="getBtnImgStyle()" @click="setTime(hour * 8)" :img="'statics/datetime/hour-' + hour * 8 + '.svg'" :tooltip="getHourString(hour * 8)"/>
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

  export default {
    props: {
      min: { required: false },
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
      getBtnImgTextStyle () {
        return 'margin: 0.2em 0; height: 1em'
      },
      getBtnImgStyle () {
        return 'margin: 0; height: 2em'
      },
      setTime (hour) {
        console.log(hour)
      },
      getDayInMonth (add) {
        return addDays(this.getMin(), add).getDate()
      },
      getHourString (hour) {
        switch (hour) {
          case 8:
            return this.$t('Morning')
          case 16:
            return this.$t('Afternoon')
          case 24:
            return this.$t('Night')
        }
      },
      getDayString (add) {
        let day = addDays(this.getMin(), add).getDay()
        switch (day) {
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
      getMin () {
        if (this.min instanceof Date) { return this.min }
        else return new Date(this.min)
      }
    },
    computed: {
      caldate () { return this.$store.getters[this.getDeadlineFormatted] },
      duration () { return this.$store.getters[this.getDuration] }
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
