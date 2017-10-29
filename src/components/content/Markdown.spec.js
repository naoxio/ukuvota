import Vue from 'vue'
import { mount } from 'vue-test-utils'

import Markdown from './Markdown.vue'
import i18n from 'src/i18n'

describe('Markdown', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Markdown, { propsData: { name: 'summary' } })
  })

  it('can render English', () => {
    expect(wrapper.html()).toContain('Ukuvota uses a cooperative and scalable process')
  })

  it('can render German', () => {
    i18n.locale = 'de'
    Vue.nextTick(() => { // next tick so wrapper is re-rendered following locale change
      expect(wrapper.html()).toContain('Ukuvota benutzt ein kooperatives Verfahren, um gemeinsam Entscheidungen zu treffen')
    })
  })
})
