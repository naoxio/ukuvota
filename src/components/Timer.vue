<script>
  import { mapActions } from 'vuex'

  export default {
    methods: {
      ...mapActions([
        'updateDurations'
      ])
    },
    created () {
      const self = this
      this.timer = setInterval(() => {
        self.updateDurations()
      }, 1000)
    }
  }
</script>
