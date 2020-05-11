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
import getPropsValue from '@/utils/getPropsValue'
import { createQuickPorps } from '@/utils/quickPorps'

export default {
  props: createQuickPorps({
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
  }),

  computed: {
    mixinPositionStyle() {
      let style = {
        ...this.mixinBoxStyle
      }

      const position = getPropsValue(this, 'position')
      const positionP = getPropsValue(this, [
        'center',
        'zIndex',
        'top',
        'bottom',
        'left',
        'right'
      ])

      if (typeof position !== 'undefined' || Object.keys(positionP).length) {
        style = { ...style, ...positionP, position: position || 'absolute' }

        if (
          typeof style.top !== 'undefined' &&
          typeof style.bottom !== 'undefined'
        ) {
          delete style.height
        }

        if (
          typeof style.left !== 'undefined' &&
          typeof style.right !== 'undefined'
        ) {
          delete style.width
        }

        if (typeof style.center !== 'undefined') {
          if (style.center === 'x') {
            style.left = style.left || '50%'
            style.transform = 'translateX(-50%)'
          } else if (style.center === 'y') {
            style.top = style.top || '50%'
            style.transform = 'translateY(-50%)'
          } else {
            style.left = style.left || '50%'
            style.top = style.top || '50%'
            style.transform = 'translate(-50%, -50%)'
          }

          delete style.center
        }
      }

      return style
    }
  }
}
