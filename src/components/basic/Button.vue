<template>
  <div :style="buttonStyle">
    <slot></slot>
  </div>
</template>

<script>
import config from '@/config'

import status from '@/mixins/status'
import box from '@/mixins/box'
import position from '@/mixins/position'
import event from '@/mixins/event'

import getPropsValue from '@/utils/getPropsValue'

export default {
  mixins: [status, box, position, event],

  props: {
    // 方式1：设定宽高和偏移量
    moveX: {
      type: String
    },
    moveY: {
      type: String
    },

    // 方式二，设置方向和间隔
    direction: {
      type: String,
      default: 'x'
    },
    space: {
      type: [String, Number],
      default: 5
    }
  },

  computed: {
    buttonStyle() {
      let style = {
        ...this.mPositionStyle
      }

      if (style.backgroundImage) {
        let { moveX, moveY, direction, space, disabled } = getPropsValue(this, [
          'moveX',
          'moveY',
          'direction',
          'space',
          'disabled'
        ])

        const isActive = this.mEventIsTouch && !disabled

        if (moveX || moveY) {
          if (moveX) {
            style.backgroundSize = 'auto ' + style.height
          } else if (moveY) {
            style.backgroundSize = style.width + ' auto'
          }

          if (isActive) {
            if (moveX) {
              style.backgroundPositionX = moveX
            } else {
              style.backgroundPositionY = moveY
            }
          }
        } else {
          const { imageTimes, imageSizeUnit } = config
          const getSize = n => (n * imageTimes).toFixed(2) + imageSizeUnit

          const { width, height } = this.mBoxBackgroundImage
          space = Number(space)

          if (direction === 'x') {
            style.width = getSize((width - space) / 2)
            style.height = getSize(height)
            style.backgroundSize = 'auto ' + style.height
          } else {
            style.width = getSize(width)
            style.height = getSize((height - space) / 2)
            style.backgroundSize = style.width + ' auto'
          }

          if (isActive) {
            if (direction === 'x') {
              const n = (width - space) / 2 + space
              style.backgroundPositionX = '-' + getSize(n)
            } else {
              const n = (height - space) / 2 + space
              style.backgroundPositionY = '-' + getSize(n)
            }
          }
        }
      }

      return style
    }
  }
}
</script>
