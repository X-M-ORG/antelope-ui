<template>
  <div :style="listStyle">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

import status from '@/mixins/status'
import box from '@/mixins/box'
import position from '@/mixins/position'
import event from '@/mixins/event'

const BScrollEvents = [
  'beforeScrollStart',
  'scrollStart',
  'scroll',
  'scrollCancel',
  'scrollEnd',
  'touchEnd',
  'flick',
  'refresh',
  'destroy',
  'pullingDown',
  'pullingUp',
  'zoomStart',
  'zoomEnd'
]

export default {
  mixins: [status, box, position, event],

  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      scroll: null
    }
  },

  computed: {
    listStyle() {
      return {
        overflow: 'hidden',
        ...this.mPositionStyle
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$el, this.options)

      Object.keys(this.$listeners).forEach(name => {
        const evnet = BScrollEvents.find(
          i =>
            i.toLocaleLowerCase() === name.replace(/-/g, '').toLocaleLowerCase()
        )

        if (evnet) {
          this.scroll.on(evnet, this.$listeners[name])
        }
      })
    })
  }
}
</script>
