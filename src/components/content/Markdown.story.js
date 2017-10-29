import { storiesOf } from '@storybook/vue'

import Markdown from './Markdown.vue'

storiesOf('Content / Markdown', module)

  .add('summary', () => ({
    render: h => h(Markdown, { props: { name: 'summary' } })
  }))

  .add('negativeScoreWeighting', () => ({
    render: h => h(Markdown, { props: { name: 'negativeScoreWeighting' } })
  }))
