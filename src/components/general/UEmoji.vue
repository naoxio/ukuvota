<template>
  <img :src="src" height="32px">
</template>

<script>
  import minus3 from 'src/statics/emo/-3.svg'
  import minus2 from 'src/statics/emo/-2.svg'
  import minus1 from 'src/statics/emo/-1.svg'
  import zero from 'src/statics/emo/0.svg'
  import plus1 from 'src/statics/emo/1.svg'
  import plus2 from 'src/statics/emo/2.svg'
  import plus3 from 'src/statics/emo/3.svg'

  const images = {
    '-3': minus3,
    '-2': minus2,
    '-1': minus1,
    '0': zero,
    '1': plus1,
    '2': plus2,
    '3': plus3
  }

  export default {
    props: {
      id: Number
    },
    computed: {
      src () {
        return images[this.id]
      }
    }
  }
</script>
