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
  import UCard from '@/General/UCard'
  import ULabel from '@/General/ULabel'
  import ExportImage from '@/Content/ExportImage'
  import ExportText from '@/Results/ExportText'
  
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
