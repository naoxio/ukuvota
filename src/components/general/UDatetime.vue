<template>
  <div>
    <div class="row no-wrap">
      <ULabel :value="durationLabel" />
      &nbsp;
      <ULabel class="sublabel" :value="duration" />
    </div>
    <div class="row justify-between">
      <div class="row"> 
        <div class="bg-primary">
          <UBtn
            style="font-size: 0.6em;"
            class="btn-info"
            color="white"
            :tooltip="$t('DatePicker')"
            icon="today"
            :text="getDate()"
            > 
            <q-popover ref="date">
              <q-inline-datetime :min="min" v-model="deadline" type="date">
                <q-btn @click="$refs.date.close()">
                  {{ $t('Close') }}
                </q-btn>
              </q-inline-datetime>
            </q-popover>
          </UBtn>
        </div>
	      <div v-for="day in days" :key="day" class="bg-light">
		      <UBtn
            class="text-white btn-item"
            :text="String(getDayInMonth(day - 1))"
            :tooltip="getDayString(day - 1)"
            />
        </div>
      </div>
      <div class="row">
        <div class="bg-primary">
          <UBtn
            style="font-size: 0.6em"
            color="white"
            class="btn-info"
            :tooltip="$t('TimePicker')"
            :text="getTime()"
            icon="access time"> 
            <q-popover ref="time">
              <q-inline-datetime format24h :min="min" v-model="deadline" type="time">
                <q-btn @click="$refs.time.close()">
                  {{ $t('Close') }}
                </q-btn>
              </q-inline-datetime>
            </q-popover>
          </UBtn>
        </div>
        <div v-for="hour in times" :key="hour" class="bg-light">
          <!--UWheelBtn :incrOptions="dayOptions" :incrValue="1"/-->
          
          <UBtn class="text-white btn-item" :imgStyle="getBtnImgStyle()" @click="setTime(hour)" :img="'statics/datetime/hour-' + hour + '.svg'" :tooltip="getHourString(hour)"/>
          <!--UWheelBtn :incrOptions="hourOptions" :incrValue="1"/-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { QBtn, QChip, QPopover, QIcon, QInput, QInlineDatetime, QSelect } from 'quasar'
  import UWheelBtn from './UWheelBtn'
  import { addDays, format } from 'src/helpers/datefns'
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
    mounted () {
      console.log(this.deadline)
    },
    watch: {
      deadline (val) { this.$store.dispatch(this.updDeadline + 'Sync', val) }
    },
    components: {
      UBtn,
      ULabel,
      UWheelBtn,
      QBtn,
      QChip,
      QPopover,
      QIcon,
      QInlineDatetime,
      QInput,
      QSelect
    },
    methods: {
      getDate () {
        return format(this.deadline, 'D MMM')
      },
      getTime () {
        let hours = String(this.deadline.getHours())
        let minutes = String(this.deadline.getMinutes())
        if (hours.length === 1) hours = '0' + hours
        if (minutes.length === 1) minutes = '0' + minutes
        return hours + ':' + minutes
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
          case 12:
            return this.$t('Midday')
          case 20:
            return this.$t('Evening')
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
        times: [8, 12, 20, 24],
        days: [1, 2, 3, 4, 5, 6, 7],
        deadline: new Date(this.$store.getters['get' + this.store + 'Deadline']),
        updDeadline: 'update' + this.store + 'Deadline',
        getDeadline: 'get' + this.store + 'Deadline',
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
  .btn-info
    width 6.5em
    height 100%
  .btn-item
    width 2.233em
    height 100%
    
</style>
