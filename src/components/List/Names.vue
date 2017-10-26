<template> 
  <div class="row justify-around">
    <div v-for="(object, name, index) in votes" :key="name">
      <div v-if='select'>
        <NameSelect :name="name"/>
      </div>
      <div v-else>
        {{ name }}
      </div>
    </div>
  </div>
</template>

<script>
  import NameSelect from '@/Select/Name'
  import { mapState } from 'vuex'

  export default {
    props: {
      select: { default: true }
    },
    computed: {
      ...mapState([
        'votes'
      ])
    },
    components: {
      NameSelect
    }
  }
</script>

<style lang="stylus" scoped>
 *
  color grey
</style>
