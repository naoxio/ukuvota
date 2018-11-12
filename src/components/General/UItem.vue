<template>
  <div class="row justify-between items-start">
    <div class="col">
      <div v-if="editme">
        <UInput :floatLabel="floatlabel" @keyup.ctrl.enter.native="save"  :value.sync="la" />
        <UInput :floatLabel="floatsublabel" @keyup.ctrl.enter.native="save" :value.sync="subla" type="textarea" :min-rows="2" />
      </div>
      <div v-else>
        <ULabel hyperlink :value="la" />
        <UserMarkdown class="sublabel" :source="subla" />
      </div>
    </div>
    <div class="col-auto" v-if="editable">
      <div v-if="editme === false">
        <q-icon @click="edit" name="edit" />
      </div>
      <div v-else>
        <q-icon @click="save" name="save" />
      </div>
    </div>
  </div>
</template>

<script>
  import ULabel from '@/General/ULabel'
  import UInput from '@/General/UInput'
  import UserMarkdown from '@/General/UserMarkdown'
  import { QIcon } from 'quasar'

  export default {
    props: {
      label: { require: true },
      floatlabel: { required: false },
      sublabel: { required: false },
      floatsublabel: { required: false },
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
      QIcon,
      UserMarkdown
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

.sublabel >>> *:not(a)
  color grey

.q-icon
  cursor pointer
  font-size 1.2em
  color $primary
</style>
