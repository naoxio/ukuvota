<template>
  <u-btn :click="saveImage" icon="camera alt" :tooltip="$t('SaveImage')" />
</template>
<script>
  import html2canvas from 'html2canvas'
  import FileSaver from 'file-saver'
  import UBtn from '@/General/UBtn'

  export default {
    components: {
      UBtn
    },
    props: {
      'element': { required: true }
    },
    methods: {
      saveImage () {
        console.log(this.element)
        html2canvas(document.getElementById(this.element), {
          onrendered: function (canvas) {
            let c = document.body.appendChild(canvas)
            c.id = 'canvas'

            c.toBlob(function (blob) {
              FileSaver.saveAs(blob, 'results.jpg')
            })
            document.body.removeChild(canvas)
          }
        })
      }
    }
  }
</script>
