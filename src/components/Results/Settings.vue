<template>
  <div class="text-left">
    <h5>{{ $t('EmojiView') }}</h5>
    {{ $t('onEmojiHover') }}
    <div class="row justify-between">
      <q-checkbox
        v-model="hoverNone"
        unchecked-icon="visibility_off"
        checked-icon="visibility"
        :label="$t('doNothing')"
      >
      </q-checkbox>
      <q-checkbox
        v-model="hoverAvg"
        unchecked-icon="visibility_off"
        checked-icon="visibility"
        :label="$t('showAverageScore')"
      >
      </q-checkbox>
      <q-checkbox
        v-model="hoverTotal"
        unchecked-icon="visibility_off"
        checked-icon="visibility"
        :label="$t('showTotalScore')"
      >
      </q-checkbox>

        <!--img src="statics/emo/1.svg"/-->
    </div>
  </div>
</div>
</template>
<script>
  import { QCheckbox } from 'quasar'
  import { mapActions, mapState } from 'vuex'
  
  export default {
    components: {
      QCheckbox
    },
    methods: {
      checkHoverNone () { if (!this.hoverAvg && !this.hoverTotal) this.hoverNone = true; this.updateHover() },
      checkOtherTrue (val) { if (val) this.hoverNone = false },
      hoverOther (val) { this.checkOtherTrue(val); this.checkHoverNone(); this.updateHover() },
      ...mapActions([
        'updResHover'
      ]),
      updateHover () {
        this.$store.dispatch('updResHover', { none: this.hoverNone, avg: this.hoverAvg, total: this.hoverTotal })
      }
    },
    watch: {
      hoverNone (val) {
        if (val) {
          this.hoverAvg = false
          this.hoverTotal = false
        }
        this.checkHoverNone()
      },
      hoverAvg (val) { this.hoverOther(val) },
      hoverTotal (val) { this.hoverOther(val) }
    },
    data () {
      return {
        ...mapState([
          'resHover'
        ]),
        hoverNone: this.$store.state.resHover.none,
        hoverAvg: this.$store.state.resHover.avg,
        hoverTotal: this.$store.state.resHover.total
      }
    }
  }
</script>
