/*
  混合定位属性
  status
*/

export default {
  data() {
    return {
      mixins_touchstart: () => {},
      mixins_touchmove: () => {},
      mixins_touchend: () => {},
      mixins_is_touch: false,
      mixins_is_tap: false
    }
  },

  mounted() {
    this.mixins_touchstart = () => {
      this.mixins_is_touch = true
      this.mixins_is_tap = true
    }
    this.mixins_touchmove = () => {
      this.mixins_is_tap = false
    }
    this.mixins_touchend = () => {
      if (this.mixins_is_tap && this.status) {
        this.$emit('a-tap')
      }

      this.mixins_is_touch = false
      this.mixins_is_tap = false
    }

    this.$el.addEventListener('touchstart', this.mixins_touchstart)
    this.$el.addEventListener('touchmove', this.mixins_touchmove)
    this.$el.addEventListener('touchend', this.mixins_touchend)
  },
  destroyed() {
    this.$el.removeEventListener('touchstart', this.mixins_touchstart)
    this.$el.removeEventListener('touchmove', this.mixins_touchmove)
    this.$el.removeEventListener('touchend', this.mixins_touchend)
  }
}
