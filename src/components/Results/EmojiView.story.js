import { storiesOf } from '@storybook/vue'

import EmojiView from './EmojiView.vue'
import i18n from 'src/i18n'
import store from 'src/store'

storiesOf('Results / EmojiView', module)

  .add('EmojiView', () => ({
    store,
    i18n,
    render: h => h(EmojiView, {
      props: {
        results: {
          1: 3,
          2: 2
        },
        votes: {
          nick: {
            1: 3,
            2: 2
          },
          peter: {
            1: -3,
            2: 2
          }
        },
        proposals: {
          1: {
            title: 'foo',
            description: 'a nice proposal'
          },
          2: {
            title: 'bar',
            description: 'another nice proposal'
          }
        },
        max: 10,
        negativeScore: -3
      }
    })
  }))
