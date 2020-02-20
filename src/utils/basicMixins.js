import getKeysValue from './getKeysValue'

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },

    // box
    width: {
      type: String
    },
    height: {
      type: String
    },
    backgroundColor: {
      type: String
    },
    backgroundImage: {
      type: String
    },

    // position
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

  data() {
    return {
      m_basic_touchstart: () => {},
      m_basic_touchmove: () => {},
      m_basic_touchend: () => {},
      m_basic_isTouch: false,
      m_basic_isTap: false
    }
  },

  computed: {
    m_basicStyle() {
      let style = {
        position: 'relative',
        ...getKeysValue(
          ['width', 'height', 'backgroundColor', 'backgroundImage'],
          this
        )
      }

      if (style.backgroundImage) {
        let key = style.backgroundImage

        if (this.disabled) {
          let k = key.split('.')
          k.splice(k.length - 1, 0, 'disabled')
          key = k.join('.')
        }

        let file

        if (this.$route && this.$route.meta.aImagesMap) {
          file = this.$route.meta.aImagesMap[key]
        }

        style.backgroundImage = `url(${file || key})`
        style.backgroundSize = '100% 100%'
      }

      if (typeof this.position !== 'undefined') {
        style = {
          ...style,
          ...getKeysValue(['zIndex', 'top', 'bottom', 'left', 'right'], this),
          position: this.position || 'absolute'
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
  },

  mounted() {
    this.m_basic_touchstart = () => {
      this.m_basic_isTouch = true
      if (typeof this.isTouch !== 'undefined') {
        this.isTouch = true
      }

      this.m_basic_isTap = true
    }
    this.m_basic_touchmove = () => {
      this.m_basic_isTap = false
    }
    this.m_basic_touchend = () => {
      this.m_basic_isTouch = false
      if (typeof this.isTouch !== 'undefined') {
        this.isTouch = false
      }

      if (this.m_basic_isTap && !this.disabled) {
        this.$emit('a-tap')

        Object.keys(this)
          .filter(
            k => k.indexOf('m_tapEvent') > -1 && typeof this[k] === 'function'
          )
          .forEach(k => {
            this[k]()
          })
      }
    }

    this.$el.addEventListener('touchstart', this.m_basic_touchstart)
    this.$el.addEventListener('touchmove', this.m_basic_touchmove)
    this.$el.addEventListener('touchend', this.m_basic_touchend)
  },
  destroyed() {
    this.$el.removeEventListener('touchstart', this.m_basic_touchstart)
    this.$el.removeEventListener('touchmove', this.m_basic_touchmove)
    this.$el.removeEventListener('touchend', this.m_basic_touchend)
  }
}
