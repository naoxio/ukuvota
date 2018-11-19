<template>
  <div>
    <div v-for="(obj, id) in proposals" :key="id">
      <template v-if="obj.title">
        <ULabel class="title" :hyperlink="true" :value="obj.title" />
        <ULabel v-if="obj.description" class="desc" :hyperlink="true" :value="obj.description" markdown />
        <div class="row justify-around">
          <div v-for="file in emo" :key="file">
            <div
              :class="{ selected: isSelected(id, file) }"
              @click="select(id, file)"
              >
              <img class="emo" :src="'statics/emo/' + file + '.svg'" height="32px" />
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import ULabel from '@/General/ULabel'

  export default {
    props: {
      'proposals': { required: true },
      'tmpemojis': { required: true }
    },
    components: { ULabel },
    methods: {
      isSelected (id, file) {
        if (file === this.tmpemojis[id]) return true
        else return false
      },
      select (id, val) {
        let obj = { id, val }
        this.$emit('update:tmpemojis', obj)
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
  .title
    color grey
    font-size 1.5em

  .desc
    color grey

  .emo
    filter grayscale(1)

  .emo:hover
    cursor pointer
    filter grayscale(0.5)

  .selected
    .emo
      filter grayscale(0)
</style>
