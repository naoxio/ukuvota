<template>
  <div class="col-1 info" @click="$refs.weightingInfo.open()">
    <q-icon color="primary" name="fa-info" />
    <q-modal ref="weightingInfo" :content-css="{padding: '50px', maxWidth: '700px'}">
      <MarkdownContent name="negativeScoreWeighting" />
      <q-btn color="primary" @click="$refs.weightingInfo.close()">{{ $t('Close') }}</q-btn>
      <br/><br/>
    </q-modal>
  </div>
</template>

<script>
  import MarkdownContent from '@/Content'
  import {
    QBtn,
    QIcon,
    QModal
  } from 'quasar'
  
  export default {
    components: {
      MarkdownContent,
      QBtn,
      QModal,
      QIcon
    }
  }
</script>

<style lang="stylus">
.info {
  cursor pointer
  font-size 14px
  display inline
  padding-left 10px
}
</style>
