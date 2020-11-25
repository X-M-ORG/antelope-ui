<template>
  <div :style="buttonStyle">
    <slot></slot>
  </div>
</template>

<script>
import config from '../../config'

import status from '../../mixins/status'
import box from '../../mixins/box'
import position from '../../mixins/position'
import event from '../../mixins/event'

import getPropsValue from '../../utils/getPropsValue'

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

    // 方式2，设置方向和间隔
    direction: {
      type: String,
      default: 'x'
    },
    space: {
      type: [String, Number],
      default: 6
    }
  },

  computed: {
    buttonStyle() {
      let style = { ...this.mPositionStyle }

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
          const { buttonImgSpace, imageTimes, imageSizeUnit } = config
          const { width, height } = this.mBoxBackgroundImage

          space = Number(buttonImgSpace === -1 ? space : buttonImgSpace)

          const getSize = (n) => (n * imageTimes).toFixed(2) + imageSizeUnit
          const getLen = (n) => (disabled ? n : (n - space) / 2)

          if (direction === 'x') {
            style.width = getSize(getLen(width))
            style.height = getSize(height)
            style.backgroundSize = 'auto ' + style.height
          } else {
            style.width = getSize(width)
            style.height = getSize(getLen(height))
            style.backgroundSize = style.width + ' auto'
          }

          if (isActive) {
            if (direction === 'x') {
              style.backgroundPositionX = '-' + getSize(getLen(width) + space)
            } else {
              style.backgroundPositionY = '-' + getSize(getLen(height) + space)
            }
          }
        }
      }

      return style
    }
  }
}
</script>
