<template>
  <div :style="spriteStyle">
    <slot></slot>
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
    size: {
      type: String,
      default: ''
    },
    x: {
      type: String,
      default: ''
    },
    y: {
      type: String,
      default: ''
    }
  },

  computed: {
    spriteStyle() {
      let style = {
        ...this.mixins_position_style
      }

      if (style.backgroundImage) {
        if (this.size) {
          style.backgroundSize = this.size
        }
        if (this.x) {
          style.backgroundPositionX = this.x
        }
        if (this.y) {
          style.backgroundPositionY = this.y
        }
      }

      return style
    }
  }
}
</script>
