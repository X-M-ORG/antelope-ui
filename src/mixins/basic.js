import { getKeysValue } from '../utils'

export default {
  props: {
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    backgroundColor: {
      type: String,
      default: ''
    },
    backgroundImage: {
      type: String,
      default: ''
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      m_touchstart: () => {},
      m_touchmove: () => {},
      m_touchend: () => {},

      m_isTouch: false,
      m_isTap: false
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

        if (this.$route.meta.aImagesMap) {
          file = this.$route.meta.aImagesMap[key]
        }

        style.backgroundImage = `url(${file || key})`
        style.backgroundSize = '100% 100%'
      }

      return style
    }
  },

  mounted() {
    this.m_touchstart = () => {
      this.m_isTouch = true
      if (typeof this.isTouch !== 'undefined') {
        this.isTouch = true
      }

      this.m_isTap = true
    }
    this.m_touchmove = () => {
      this.m_isTap = false
    }
    this.m_touchend = () => {
      this.m_isTouch = false
      if (typeof this.isTouch !== 'undefined') {
        this.isTouch = false
      }

      if (this.m_isTap && !this.disabled) {
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

    this.$el.addEventListener('touchstart', this.m_touchstart)
    this.$el.addEventListener('touchmove', this.m_touchmove)
    this.$el.addEventListener('touchend', this.m_touchend)
  },
  destroyed() {
    this.$el.removeEventListener('touchstart', this.m_touchstart)
    this.$el.removeEventListener('touchmove', this.m_touchmove)
    this.$el.removeEventListener('touchend', this.m_touchend)
  }
}
