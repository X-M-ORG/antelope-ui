<template>
  <div :style="spriteStyle">
    <slot></slot>
  </div>
</template>

<script>
import status from '@/mixins/status'
import box from '@/mixins/box'
import position from '@/mixins/position'
import event from '@/mixins/event'

import getPropsValue from '@/utils/getPropsValue'

import config from '@/config'

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
        ...this.mixinPositionStyle
      }

      if (style.backgroundImage) {
        const { width, height } = this.mixinBoxBackgroundImage
        style.backgroundSize = [
          (width * config.imageTimes).toFixed(2) + config.imageSizeUnit,
          (height * config.imageTimes).toFixed(2) + config.imageSizeUnit
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
