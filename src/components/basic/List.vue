<template>
  <div class="a-list" :style="listStyle">
    <div ref="scroll" class="content" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import status from '../../mixins/status'
import box from '../../mixins/box'
import position from '../../mixins/position'
import event from '../../mixins/event'

export default {
  mixins: [status, box, position, event],

  props: {
    direction: {
      type: String,
      default: 'y'
    }
  },

  data() {
    return {}
  },

  computed: {
    listStyle() {
      return {
        overflow: 'hidden',
        ...this.mPositionStyle
      }
    },

    contentStyle() {
      let overflow = ['hidden', 'hidden']
      overflow[this.direction === 'x' ? 0 : 1] = 'auto'

      return {
        width: '100%',
        height: '100%',
        boxSizing: 'content-box',
        overflow: overflow.join(' '),
        [`padding-${this.direction === 'y' ? 'right' : 'bottom'}`]: '20px'
      }
    },

    $scroll() {
      return this.$refs.scroll
    }
  },

  mounted() {}
}
</script>
