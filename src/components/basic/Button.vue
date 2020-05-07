<template>
  <div :style="buttonStyle">
    <slot></slot>
  </div>
</template>

<script>
import status from '@/mixins/status'
import box from '@/mixins/box'
import position from '@/mixins/position'
import event from '@/mixins/event'

export default {
  mixins: [status, box, position, event],

  props: {
    moveX: {
      type: String,
      default: ''
    },
    moveY: {
      type: String,
      default: ''
    }
  },

  computed: {
    buttonStyle() {
      let style = {
        ...this.mixins_position_style
      }

      if (style.backgroundImage) {
        if (this.moveX) {
          style.backgroundSize = 'auto ' + style.height
        } else if (this.moveY) {
          style.backgroundSize = style.width + ' auto'
        }

        if (this.mixins_is_tap && this.status) {
          if (this.moveX) {
            style.backgroundPositionX = this.moveX
          } else if (this.moveY) {
            style.backgroundPositionY = this.moveY
          }
        }
      }

      return style
    }
  }
}
</script>
