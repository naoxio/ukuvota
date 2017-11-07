<template>
  <div class="row justify-between items-start">
    <div class="col">
      <div v-if="editme">
        <UInput :floatLabel="floatlabel" :hyperlink="false" @keyup.enter.native="save"  :value.sync="la" />
        <UInput :floatLabel="floatsublabel" :hyperlink="false" @keyup.enter.native="save" class="sublabel" :value.sync="subla" />
      </div>
      <div v-else>
        <ULabel :hyperlink="true" :value="la" />
        <ULabel :hyperlink="true" class="sublabel" :value="subla" />
      </div>
    </div>
    <div class="col-auto" v-if="editable">
      <div v-if="editme === false">
        <q-icon @click="edit" name="edit" />
      </div>
      <div v-else>
        <q-icon@click="save" name="save" />
      </div>
    </div>
  </div>
</template>

<script>
  import ULabel from '@/general/ULabel'
  import UInput from '@/general/UInput'
  import { QIcon } from 'quasar'

  export default {
    props: {
      label: { require: true },
      floatlabel: String,
      sublabel: String,
      floatsublabel: String,
      editable: { default: false },
      editifblank: { default: false },
      uid: { required: false }
    },
    mounted () {
      if (this.label === '' && this.sublabel === '' && this.editifblank) {
        this.editme = true
      }
    },
    methods: {
      edit () {
        this.editme = true
      },
      save () {
        this.editme = false
        this.$emit('update:newData', { uid: this.uid, label: this.la, sublabel: this.subla })
      }
    },
    watch: {
      la (newVal) {
        this.$emit('update:label', newVal)
      },
      subla (newVal) {
        this.$emit('update:sublabel', newVal)
      }
    },
    components: {
      ULabel,
      UInput,
      QIcon
    },
    data () {
      return {
        editme: false,
        la: this.label,
        subla: this.sublabel
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~variables'

  .sublabel
    color grey

  .q-icon
    cursor pointer
    font-size 1.2em
    color $primary
</style>
