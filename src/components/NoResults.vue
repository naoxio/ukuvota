<template>
  <center>    
    <router-link :to="{ name: 'create' }">
      <img id="noresults" src="statics/noresults.svg"></img>
    </router-link>
    <p style="font-size: 50px">{{ $t('Results.noOneVoted') }}</p>
    <router-link :to="{ name: 'create' }">
      <p style="font-size: 30px">{{ $t('Results.tryAgain') }}</p>
    </router-link>
  </center>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
  @keyframes blink {
    50% {
      opacity 0.6
      transform:rotate(20deg)
    }
  }

  #noresults
    max-width 200px
    animation spin 10s linear infinite
    animation blink 1s step-start 0s infinite
</style>
