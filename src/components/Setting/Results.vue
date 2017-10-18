<template>
  <div>
    <h5>{{ $t('ResultSetting') }}</h5>
    <div>
      <!--div :class="rowStyle">{{ $t('Theme') }} <Theme /> </div>-->
    </div>
  </div>
</div>
</template>
<script>
  import Language from '@/Select/Language'
  import Theme from '@/Select/Theme'

  export default {
    components: {
      Language,
      Theme
    }
  }
</script>
