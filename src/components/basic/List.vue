<template>
  <div :style="listStyle">
    <div :style="iStyle">
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

  computed: {
    listStyle() {
      return {
        overflow: 'hidden',
        ...this.mixins_position_style
      }
    },

    iStyle() {
      let d = this.direction
      return {
        height: '100%',
        width: '100%',
        boxSizing: 'content-box',
        [`padding-${d === 'y' ? 'right' : 'bottom'}`]: '0.2rem',
        [`overflow-${d === 'y' ? 'x' : 'y'}`]: 'hidden',
        [`overflow-${d}`]: 'scroll'
      }
    }
  }
}
</script>
