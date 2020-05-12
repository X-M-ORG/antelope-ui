/*
  混合定位属性
  status
*/
import getPropsValue from '@/utils/getPropsValue'

const isPhone = navigator.userAgent.match(
  /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
)

const TOUCHSTART_EVENT = isPhone ? 'touchstart' : 'mousedown'
const TOUCHMOVE_EVENT = isPhone ? 'touchmove' : 'mousemove'
const TOUCHEND_EVENT = isPhone ? 'touchend' : 'mouseup'

export default {
  data() {
    return {
      mixinEventTouchstart: () => {},
      mixinEventTouchmove: () => {},
      mixinEventTouchend: () => {},
      mixinEventIsTouch: false,
      mixinEventIsTap: false
    }
  },

  mounted() {
    this.mixinEventTouchstart = () => {
      this.mixinEventIsTouch = this.mixinEventIsTap = true
    }
    this.mixinEventTouchmove = () => {
      this.mixinEventIsTap = false
    }
    this.mixinEventTouchend = () => {
      if (this.mixinEventIsTap && getPropsValue(this, 'status')) {
        this.$emit('a-tap')
      }

      this.mixinEventIsTouch = this.mixinEventIsTap = false
    }

    this.$el.addEventListener(TOUCHSTART_EVENT, this.mixinEventTouchstart)
    this.$el.addEventListener(TOUCHMOVE_EVENT, this.mixinEventTouchmove)
    this.$el.addEventListener(TOUCHEND_EVENT, this.mixinEventTouchend)
  },
  destroyed() {
    this.$el.removeEventListener(TOUCHSTART_EVENT, this.mixinEventTouchstart)
    this.$el.removeEventListener(TOUCHMOVE_EVENT, this.mixinEventTouchmove)
    this.$el.removeEventListener(TOUCHEND_EVENT, this.mixinEventTouchend)
  }
}
