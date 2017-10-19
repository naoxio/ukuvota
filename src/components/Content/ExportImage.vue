<template>
 <div class="row padding">
    <q-btn @click="saveImage">
      {{ $t('SaveImage')}}
    </q-btn>
  </div>
</template>
<script>
  import { QBtn } from 'quasar'
  import html2canvas from 'html2canvas'
  import canvasToImage from 'canvas-to-image'
  export default {
    components: {
      QBtn
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

            canvasToImage('canvas', {
              name: 'results',
              type: 'jpg',
              quality: 0.7
            })
            document.body.removeChild(canvas)
          }
        })
      }
    }
  }
</script>
