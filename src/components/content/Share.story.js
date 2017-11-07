import { storiesOf } from '@storybook/vue'

import Share from './Share.vue'
import i18n from 'src/i18n'

storiesOf('Content / Share', module)
    .add('Share', () => ({
      i18n,
      render: h => h(Share, { props: { name: 'summary' } })
    }))
