/*
  混合定位属性

  属性:
  position 定位模式
  zIndex 层级
  top 上
  bottom 下
  left 左
  right 右
  center 对齐方式

  依赖的混合:
    box
*/
import getKeysValue from '../utils/getKeysValue'

export default {
  props: {
    position: {
      type: String
    },
    zIndex: {
      type: String
    },
    top: {
      type: String
    },
    bottom: {
      type: String
    },
    left: {
      type: String
    },
    right: {
      type: String
    },
    center: {
      type: String
    }
  },

  computed: {
    mixins_position_style() {
      let style = {
        ...this.mixins_box_style
      }

      if (typeof this.position !== 'undefined') {
        style = {
          ...style,
          ...getKeysValue(this, ['zIndex', 'top', 'bottom', 'left', 'right']),
          position: this.position || 'absolute'
        }

        if (
          typeof this.top !== 'undefined' &&
          typeof this.bottom !== 'undefined'
        ) {
          delete style.height
        }

        if (
          typeof this.left !== 'undefined' &&
          typeof this.right !== 'undefined'
        ) {
          delete style.width
        }

        if (typeof this.center !== 'undefined') {
          if (this.center === 'x') {
            style.left = style.left || '50%'
            style.transform = 'translateX(-50%)'
          } else if (this.center === 'y') {
            style.top = style.top || '50%'
            style.transform = 'translateY(-50%)'
          } else {
            style.left = style.left || '50%'
            style.top = style.top || '50%'
            style.transform = 'translate(-50%, -50%)'
          }
        }
      }

      return style
    }
  }
}
