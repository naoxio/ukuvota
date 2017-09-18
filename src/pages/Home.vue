<template>
  <main-layout>
    <div style="max-width: 700px; text-align: left;">
      <p>Ukuvota uses a cooperative and scalable process to help individuals reach collective decisions. The core process is <a href="https://electology.org/score-voting">score voting</a> with additional features to make it more cooperative:</p>
      <ul>
        <li><strong>To &quot;keep things the way they are&quot; is always an option, never the default.</strong> Framing this option as a default position introduces a significant conservative bias—listing it as an option removes this bias and keeps a collective evolutionary.</li>
        <li><strong>To &quot;look for other options&quot; is always an option.</strong> If none of the other current options are good enough, people are able to choose to look for better ones—this ensures that there is always an acceptable option for everyone.</li>
        <li><strong>Every participant can express how much they support or oppose each option.</strong> Limiting people to choose their favorite or list their preference prevents them from fully expressing their opinions—scoring clarifies opinions and makes it much more likely to identify the best decision.</li>
        <li><strong>Acceptance (non-opposition) is the main determinant for the best decision.</strong> A decision with little opposition reduces the likelihood of conflict, monitoring or sanctioning—it is also important that some people actively support the decision to ensure it actually happens.</li>
      </ul>
      <center>
        <router-link :to="{ name: 'app' }">
          <q-btn>Start Web App</q-btn>
        </router-link>
      </center>
    </div>
  </main-layout>
</template>
<script>
import MainLayout from 'layouts/MainLayout'
import { QBtn, QCard, QCardMain, QField, QItem, QItemMain } from 'quasar'

export default {
  components: {
    MainLayout, QBtn, QCard, QCardMain, QField, QItem, QItemMain
  }
}
</script>
<style lang="stylus">
</style>
