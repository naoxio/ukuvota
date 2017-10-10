
<template> 
  <div class="row justify-between">
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
import NameSelect from '@/NameSelect'

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

<style lang="stylus">

</style>
