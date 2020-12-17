<template>
  <div class="a-slider" :style="mPositionStyle">
    <template v-if="mode === 'text'">
      <div class="slider-item" v-for="i in 2" :key="i" :style="{ 'animation-duration': (duration / 1000) + 's' }" :class="{ 'slider-in': values[i -1], 'slider-out': values[i -1] && animation && current === i -1 }">{{ values[i -1] }}</div>
    </template>
    <template v-else-if="mode === 'slot'">
      <div class="slider-item" v-for="(name, i) in items" :key="i" :style="{ 'animation-duration': (duration / 1000) + 's' }" :class="{ 'slider-in': isIn(name), 'slider-out': isOut(name) }">
        <slot :name="name"></slot>
      </div>
    </template>
  </div>
</template>

<script>
import status from '../../mixins/status'
import box from '../../mixins/box'
import position from '../../mixins/position'
import event from '../../mixins/event'

import {
  setAnimationTimeout,
  clearAnimationTimeout
} from '../../utils/animationTimeout'

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
    },

    items: {
      type: Array,
      default: () => []
    },

    mode: {
      validator: (v) => ['text', 'slot'].indexOf(v) !== -1,
      default: 'text'
    }
  },

  data() {
    return {
      timer: 0,
      current: -1,
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
      clearAnimationTimeout(this.timer)

      if (this.current === 0) {
        this.values[1] = value
      } else {
        this.values[0] = value
      }

      this.timer = setAnimationTimeout(() => {
        if (this.current === 0) {
          this.current = 1
          this.values[0] = undefined
        } else {
          this.current = 0
          this.values[1] = undefined
        }
      }, this.duration)
    },

    isIn(name) {
      let index = -1
      if (this.values[0] === name) {
        index = 0
      } else if (this.values[1] === name) {
        index = 1
      }

      return index > -1
    },

    isOut(name) {
      let index = -1
      if (this.values[0] === name) {
        index = 0
      } else if (this.values[1] === name) {
        index = 1
      }

      if (index === -1) {
        return false
      }

      return this.animation && this.current === index
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
