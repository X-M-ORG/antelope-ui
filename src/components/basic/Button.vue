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

import getPropsValue from '@/utils/getPropsValue'

export default {
  mixins: [status, box, position, event],

  props: {
    moveX: {
      type: String
    },
    moveY: {
      type: String
    }
  },

  computed: {
    buttonStyle() {
      let style = {
        ...this.mixinPositionStyle
      }

      if (style.backgroundImage) {
        const { moveX, moveY, disabled } = getPropsValue(this, [
          'moveX',
          'moveY',
          'disabled'
        ])

        if (moveX) {
          style.backgroundSize = 'auto ' + style.height
        } else if (moveY) {
          style.backgroundSize = style.width + ' auto'
        }

        if (this.mEventIsTap && !disabled) {
          if (moveX) {
            style.backgroundPositionX = moveX
          } else if (moveY) {
            style.backgroundPositionY = moveY
          }
        }
      }

      return style
    }
  }
}
</script>
