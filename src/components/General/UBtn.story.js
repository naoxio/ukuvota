import { storiesOf } from '@storybook/vue'

import UBtn from './UBtn.vue'
import i18n from 'src/i18n'
import pic from '../../statics/logo.png'
storiesOf('General / UBtn', module)
  .add('MailBtn', () => ({
    i18n,
    render: h => h(UBtn, {
      props: {
        icon: 'mail',
        tooltip: 'mail btn'
      }
    })
  }))

    .add('PicBtn', () => ({
      i18n,
      render: h => h(UBtn, {
        props: {
          img: pic,
          imgStyle: { width: '32px' },
          tooltip: 'logo btn'
        }
      })
    }))
