<template>
  <div>
    <div v-for="(description, title, key) in proposals" :key="title">
      <h5><q-field :label="title" /></h5>
      <q-field :label="description" />
      <div class="row justify-around">
        <div v-for="file in emo" :key="file">
          <div :class="{ selected: isSelected(file, title) }" @click="select(title, file)">
            <img class="emo" :src="'statics/emo/' + file + '.svg'" height="32px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { QField } from 'quasar'

  export default {
    props: {
      'proposals': { required: true },
      'tmpemojis': { required: true }
    },
    components: {
      QField
    },
    methods: {
      isSelected (file, title) {
        if (file === this.tmpemojis[title]) return true
        else return false
      },
      select (title, val) {
        this.$set(this.tmpemojis, title, val)
        this.$forceUpdate()
      }
    },
    data () {
      return {
        emo: [-3, -2, -1, 0, 1, 2, 3]
      }
    }
  }
</script>

<style lang="stylus" scoped>
.emo
  filter grayscale(1)

.emo:hover
  cursor pointer
  filter grayscale(0.5)

.selected
  .emo
  	filter grayscale(0)
</style>
