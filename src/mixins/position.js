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
import getPropsValue from '../utils/getPropsValue'
import getFullUnit from '../utils/getFullUnit'
import { createQuickPorps } from '../utils/quickPorps'

export default {
  props: createQuickPorps({
    position: {
      type: String
    },
    zIndex: {
      type: [String, Number]
    },
    positionSet: {
      type: [String, Number]
    },
    top: {
      type: [String, Number]
    },
    bottom: {
      type: [String, Number]
    },
    left: {
      type: [String, Number]
    },
    right: {
      type: [String, Number]
    },
    center: {
      type: String
    }
  }),

  computed: {
    mPositionStyle() {
      let style = {
        ...this.mBoxStyle,
        ...getPropsValue(this, ['zIndex'])
      }

      const position = getPropsValue(this, 'position')
      const autoActive = getPropsValue(this, ['positionSet', 'top', 'bottom', 'left', 'right', 'center'])

      if (typeof position !== 'undefined' || JSON.stringify(autoActive) !== '{}') {
        if (autoActive.positionSet) {
          const [top, right = top, bottom = top, left = right] = autoActive.positionSet.trim().split(' ')
          autoActive.top = top || 0
          autoActive.right = right || 0
          autoActive.bottom = bottom || 0
          autoActive.left = left || 0
        }

        ;['top', 'right', 'bottom', 'left'].forEach((key) => {
          if (autoActive[key]) {
            autoActive[key] = getFullUnit(autoActive[key])
          }
        })

        style = { ...style, position: position || 'absolute', ...autoActive }

        if (typeof style.top !== 'undefined' && typeof style.bottom !== 'undefined') {
          delete style.height
        }

        if (typeof style.left !== 'undefined' && typeof style.right !== 'undefined') {
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
