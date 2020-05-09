/*
  混合定位属性
  status
*/
import getPropsValue from '@/utils/getPropsValue'

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

    this.$el.addEventListener('touchstart', this.mixinEventTouchstart)
    this.$el.addEventListener('touchmove', this.mixinEventTouchmove)
    this.$el.addEventListener('touchend', this.mixinEventTouchend)
  },
  destroyed() {
    this.$el.removeEventListener('touchstart', this.mixinEventTouchstart)
    this.$el.removeEventListener('touchmove', this.mixinEventTouchmove)
    this.$el.removeEventListener('touchend', this.mixinEventTouchend)
  }
}
