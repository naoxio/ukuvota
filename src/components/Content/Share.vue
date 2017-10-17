<template>
  <div>
    <span>{{ $t('ShareableURL') }}</span>
    <div class="row">
      <div class="col">
        <input style="width: 100%" onClick="this.select();" :value="urlpath" />
      </div>
      <div class="col-auto">
        <SharingCode />
      </div>
    </div>
  </div>
</template>

<script>
  import SharingCode from '@/Modal/SharingQR'

  export default {
    components: {
      SharingCode
    },
    data () {
      return {
        urlpath: window.location.href
      }
    }
  }
</script>

<style>
</style>
