<template>
  <div :style="spriteStyle">
    <slot></slot>
  </div>
</template>

<script>
import basicMixins from '../../mixins/basic'

export default {
  mixins: [basicMixins],

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
        height: '100%',
        width: '100%',
        ...this.m_basicStyle
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
