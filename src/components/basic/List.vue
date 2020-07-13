<template>
  <div :style="listStyle">
    <div :style="contentStyle" @scroll="scroll">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import status from '@/mixins/status'
import box from '@/mixins/box'
import position from '@/mixins/position'
import event from '@/mixins/event'

import getPropsValue from '@/utils/getPropsValue'
import debounce from 'lodash/debounce'

export default {
  mixins: [status, box, position, event],

  props: {
    direction: {
      type: String,
      default: 'y'
    }
  },

  computed: {
    listStyle() {
      return {
        overflow: 'hidden',
        ...this.mixinPositionStyle
      }
    },

    contentStyle() {
      let d = getPropsValue(this, 'direction')
      return {
        height: '100%',
        width: '100%',
        boxSizing: 'content-box',
        [`padding-${d === 'y' ? 'right' : 'bottom'}`]: '0.2rem',
        [`overflow-${d === 'y' ? 'x' : 'y'}`]: 'hidden',
        [`overflow-${d}`]: 'scroll'
      }
    }
  },

  methods: {
    scroll: debounce(function(e) {
      const d = getPropsValue(this, 'direction')

      if (d === 'y') {
        const { offsetHeight, scrollHeight, scrollTop } = e.target

        if (offsetHeight + scrollTop + 100 > scrollHeight) {
          this.$emit('scroll-end')
        }
      } else {
        const { offsetWidth, scrollWidth, scrollLeft } = e.target
        if (offsetWidth + scrollLeft + 100 > scrollWidth) {
          this.$emit('scroll-end')
        }
      }
    }, 300)
  }
}
</script>
