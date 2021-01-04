<template>
  <div :style="spriteStyle">
    <slot></slot>
  </div>
</template>

<script>
import { getConfig } from '../../config'

import status from '../../mixins/status'
import box from '../../mixins/box'
import position from '../../mixins/position'
import event from '../../mixins/event'

import getPropsValue from '../../utils/getPropsValue'

export default {
  mixins: [status, box, position, event],

  props: {
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
        ...this.mPositionStyle
      }

      if (style.backgroundImage) {
        const { imageTimes, imageSizeUnit } = getConfig()
        const { width, height } = this.mBoxBackgroundImage
        style.backgroundSize = [
          (width * imageTimes).toFixed(2) + imageSizeUnit,
          (height * imageTimes).toFixed(2) + imageSizeUnit
        ].join(' ')

        const { x, y } = getPropsValue(this, ['x', 'y'])
        if (x) {
          style.backgroundPositionX = x
        }
        if (y) {
          style.backgroundPositionY = y
        }
      }

      return style
    }
  }
}
</script>
