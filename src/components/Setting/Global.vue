<template>
  <div>
    <h5>{{ $t('GlobalSettings') }}</h5>
    <div>
      <div :class="rowStyle">{{ $t('Language') }} <Language /></div>
      <!--div :class="rowStyle">{{ $t('Theme') }} <Theme /> </div>-->
    </div>
  </div>
</div>
</template>
<script>
  import Language from '@/Select/Language'
  import Theme from '@/Select/Theme'

  export default {
    props: {
      rowStyle: { required: false }
    },
    components: {
      Language,
      Theme
    }
  }
</script>
