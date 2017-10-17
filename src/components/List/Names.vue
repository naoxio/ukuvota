
<template> 
  <div class="row justify-around">
    <div v-for="(object, name, index) in votes" :key="name">
      <div v-if='select'>
        <NameSelect :options="selection" :name="name"/>
      </div>
      <div v-else>
        {{ name }}
      </div>
    </div>
  </div>
</template>

<script>
import NameSelect from '@/Select/Name'

export default {
  props: {
    votes: { required: true },
    select: { required: false }
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
