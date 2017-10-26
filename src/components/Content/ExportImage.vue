<template>
 <div>
    <q-btn @click="saveImage">
      <q-icon name="save"
    </q-btn>
  </div>
</template>
<script>
  import { QBtn, QIcon } from 'quasar'
  import html2canvas from 'html2canvas'
  import FileSaver from 'file-saver'

  export default {
    components: {
      QBtn,
      QIcon
    },
    props: {
      'element': { required: true }
    },
    methods: {
      saveImage () {
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
