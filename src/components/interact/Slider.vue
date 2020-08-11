<template>
  <div class="a-slider" :style="mPositionStyle">
    <div class="slider-item" v-for="i in 2" :key="i" :style="{ 'animation-duration': (duration / 1000) + 's' }" :class="{ 'slider-in': values[i -1], 'slider-out': values[i -1] && animation && current === i -1 }">{{ values[i -1] }}</div>
  </div>
</template>

<script>
import status from '../../mixins/status'
import box from '../../mixins/box'
import position from '../../mixins/position'
import event from '../../mixins/event'

export default {
  mixins: [status, box, position, event],

  props: {
    value: {
      type: [String, Number],
      default: ''
    },

    duration: {
      type: Number,
      default: 500
    }
  },

  data() {
    return {
      current: 0,
      values: {
        0: undefined,
        1: undefined
      }
    }
  },

  computed: {
    animation() {
      return (
        typeof this.values[0] !== 'undefined' &&
        typeof this.values[1] !== 'undefined'
      )
    }
  },

  watch: {
    value(newVal) {
      this.next(newVal)
    }
  },

  mounted() {
    this.next(this.value)
  },

  methods: {
    next(value) {
      if (this.current === 0) {
        this.values[1] = value
      } else {
        this.values[0] = value
      }

      setTimeout(() => {
        if (this.current === 0) {
          this.current = 1
          this.values[0] = undefined
        } else {
          this.current = 0
          this.values[1] = undefined
        }
      }, this.duration)
    }
  }
}
</script>

<style lang="stylus" scoped>
.a-slider
  position relative
  overflow hidden

  .slider-item
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    transform translateY(100%)
    animation-fill-mode forwards
    animation-timing-function linear

  .slider-item.slider-in
    animation-name sliderIn

  .slider-item.slider-out
    animation-name sliderOut

@keyframes sliderIn
  0%
    transform translateY(100%)

  100%
    transform translateY(0)

@keyframes sliderOut
  0%
    transform translateY(0)

  100%
    transform translateY(-100%)
</style>
