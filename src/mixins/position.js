import { getKeysValue } from '../utils'

export default {
  props: {
    mode: {
      type: String,
      default: 'absolute'
    },

    zIndex: {
      type: String,
      default: ''
    },

    top: {
      type: String,
      default: ''
    },
    bottom: {
      type: String,
      default: ''
    },
    left: {
      type: String,
      default: ''
    },
    right: {
      type: String,
      default: ''
    },

    center: {
      type: String,
      default: ''
    },
    centerX: {
      type: String,
      default: ''
    },
    centerY: {
      type: String,
      default: ''
    }
  },

  computed: {
    m_positionStyle() {
      let style = {
        position: this.mode,
        ...getKeysValue(['zIndex', 'top', 'bottom', 'left', 'right'], this)
      }

      let cp = getKeysValue(['center', 'centerX', 'centerY'], this)
      if (cp.centerX) {
        style.left = style.left || '50%'
        style.transform = 'translateX(-50%)'
      } else if (cp.centerY) {
        style.top = style.top || '50%'
        style.transform = 'translateY(-50%)'
      } else if (cp.center) {
        style.left = style.left || '50%'
        style.top = style.top || '50%'
        style.transform = 'translate(-50%, -50%)'
      }

      return style
    }
  }
}
