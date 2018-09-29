<template>
  <div>
    <span>{{ $t('ShareableURL') }}</span>
    <div class="row">
      <div class="col">
        <input style="width: 100%" onClick="this.select();" :value="urlpath" />
      </div>
      <div class="col-auto">
        <SharingCode />
        <ManualNotificationHelper />
      </div>
    </div>
  </div>
</template>

<script>
  import SharingCode from '@/Modal/SharingQR'
  import ManualNotificationHelper from '@/Modal/ManualNotificationHelper'

  export default {
    components: {
      SharingCode,
      ManualNotificationHelper
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
