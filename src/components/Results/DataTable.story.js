import { storiesOf } from '@storybook/vue'

import DataTable from './DataTable.vue'
import i18n from 'src/i18n'
import store from 'src/store'

storiesOf('Results / DataTable', module)
  .add('DataTable', () => ({
    store,
    i18n,
    created () {
      this.$store.commit('setTopic', {
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
        negativeScoreWeight: -3,
        selectedVoters: ['nick', 'peter']
      })
    },
    render: h => h(DataTable)
  }))
