<template>
  <UCard>
    <div class="row justify-around items-center">
      <h6><ULabel :value="$t('ExportData')" /></h6>
      <ExportImage v-if="canvas !== false" :element="canvas"/>
      <ExportText />
    </div>
  </UCard>
</template>
<script>
  import UCard from '@/general/UCard'
  import ULabel from '@/general/ULabel'
  import ExportImage from '@/content/ExportImage'
  import ExportText from '@/results/ExportText'
  
  export default {
    props: {
      canvas: { default: false }
    },
    components: {
      UCard,
      ULabel,
      ExportImage,
      ExportText
    }
  }
</script>
