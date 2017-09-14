<template>
  <process-layout>
    <table style="margin-top: 30px;" class="q-table horizontal-seperator flipped" :class="computedClasses">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-right">Price</th>
          <th class="text-right">In Stock</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-th="Name" class="text-left">Item #1</td>
          <td data-th="Price" class="text-right">$10.11</td>
          <td data-th="In Stock" class="text-right">101</td>
        </tr>
        <tr>
          <td data-th="Name" class="text-left">Item #2</td>
          <td data-th="Price" class="text-right">$8.88</td>
          <td data-th="In Stock" class="text-right">34</td>
        </tr>
        <tr>
          <td data-th="Name" class="text-left">Item #3</td>
          <td data-th="Price" class="text-right">$0.15</td>
          <td data-th="In Stock" class="text-right">1670</td>
        </tr>
      </tbody>
    </table>
  </process-layout>
</template>

<script>
import ProcessLayout from '@/layouts/ProcessLayout'

import {
  QCheckbox,
  QOptionGroup,
  QChip,
  QField,
  QCard,
  QCardTitle,
  QCardMain,
  QCardSeparator
} from 'quasar'

export default {
  components: {
    ProcessLayout,
    QCheckbox,
    QOptionGroup,
    QChip,
    QField,
    QCard,
    QCardTitle,
    QCardMain,
    QCardSeparator
  },
  data () {
    return {
      styles: [
        '',
        'bordered',
        'horizontal-separator',
        'vertical-separator',
        'cell-separator',
        'striped-odd',
        'striped-even',
        'highlight',
        'compact',
        'loose',
        'flipped'
      ],
      misc: [],
      separator: 'none',
      stripe: 'none',
      type: 'none',
      gutter: 'none'
    }
  },
  computed: {
    computedClasses () {
      let classes = []
      if (this.misc.includes('bordered')) {
        classes.push('bordered')
      }
      if (this.misc.includes('highlight')) {
        classes.push('highlight')
      }
      if (this.separator !== 'none') {
        classes.push(this.separator + '-separator')
      }
      if (this.stripe !== 'none') {
        classes.push('striped-' + this.stripe)
      }
      if (this.type !== 'none') {
        classes.push(this.type)
      }
      if (this.gutter !== 'none') {
        classes.push(this.gutter)
      }
      return classes
    }
  }
}
</script>