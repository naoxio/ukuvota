<template>
  <MainLayout>
    <div style="max-width: 700px; text-align: left;">
      <MarkdownContent name="manual" />
    </div>
  </MainLayout>
</template>

<script>
import MarkdownContent from '@/content/Markdown'
import MainLayout from 'layouts/MainLayout'

export default {
  components: {
    MarkdownContent,
    MainLayout
  },
  data () {
    return {

    }
  }
}

</script>

<style lang="stylus">	
	h1
		font-size 2em
		text-align center
	
	h2
		font-size 1.5em
	
	h3
		font-size 1.2em
  
	h4
		font-size 1em
		font-style bold
	
	@media screen and (max-width: 320px )
		#zRAS
			width 100%
</style>
