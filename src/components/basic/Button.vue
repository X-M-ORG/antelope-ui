<template>
  <div :style="buttonStyle">
    <slot></slot>
  </div>
</template>

<script>
import basicMixins from '../../utils/basicMixins'

export default {
  mixins: [basicMixins],

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

  data() {
    return {
      isTouch: false
    }
  },

  computed: {
    buttonStyle() {
      let style = {
        height: '100%',
        width: '100%',
        ...this.m_basicStyle
      }

      if (style.backgroundImage) {
        if (this.moveX) {
          style.backgroundSize = 'auto ' + style.height
        } else if (this.moveY) {
          style.backgroundSize = style.width + ' auto'
        }

        if (this.isTouch && !this.disabled) {
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
