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
      mEventTouchstart: () => {},
      mEventTouchmove: () => {},
      mEventTouchend: () => {},
      mEventIsTouch: false,
      mEventIsTap: false
    }
  },

  mounted() {
    this.mEventTouchstart = () => {
      this.mEventIsTouch = this.mEventIsTap = true
      this.$el.classList.add('on-touch')
    }
    this.mEventTouchmove = () => {
      this.mEventIsTap = false
    }
    this.mEventTouchend = () => {
      if (this.mEventIsTap && !getPropsValue(this, 'disabled')) {
        this.$emit('a-tap')
      }

      this.mEventIsTouch = this.mEventIsTap = false
      this.$el.classList.remove('on-touch')
    }

    this.$el.addEventListener(TOUCHSTART_EVENT, this.mEventTouchstart)
    this.$el.addEventListener(TOUCHMOVE_EVENT, this.mEventTouchmove)
    this.$el.addEventListener(TOUCHEND_EVENT, this.mEventTouchend)
  },
  destroyed() {
    this.$el.removeEventListener(TOUCHSTART_EVENT, this.mEventTouchstart)
    this.$el.removeEventListener(TOUCHMOVE_EVENT, this.mEventTouchmove)
    this.$el.removeEventListener(TOUCHEND_EVENT, this.mEventTouchend)
  }
}
