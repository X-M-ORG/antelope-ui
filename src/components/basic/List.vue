<template>
  <div class="a-list" :style="listStyle">
    <div ref="scroll" class="content" :style="contentStyle">
      <slot></slot>
    </div>
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
    direction: {
      type: String,
      default: 'y'
    },

    nested: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      preventDefault: true,
      lastPosition: { x: 0, y: 0 }
    }
  },

  computed: {
    listStyle() {
      return {
        overflow: 'hidden',
        ...this.mPositionStyle
      }
    },

    contentStyle() {
      return {
        width: '100%',
        height: '100%',
        boxSizing: 'content-box',
        [this.direction === 'x' ? 'overflowX' : 'overflowY']: 'auto',
        [`padding-${this.direction === 'y' ? 'right' : 'bottom'}`]: '20px'
      }
    },

    $scroll() {
      return this.$refs.scroll
    }
  },

  mounted() {
    this.nested && this.initScroll()
  },

  destroyed() {
    this.nested && this.removeScroll()
  },

  methods: {
    initScroll() {
      this.$scroll.addEventListener('scroll', this.onScroll)
      this.$scroll.addEventListener('touchstart', this.onTouchstart)
      this.$scroll.addEventListener('touchmove', this.onTouchmove)
    },
    removeScroll() {
      this.$scroll.removeEventListener('scroll', this.onScroll)
      this.$scroll.removeEventListener('touchstart', this.onTouchstart)
      this.$scroll.removeEventListener('touchmove', this.onTouchmove)
    },

    /**
     * 事件
     */
    onScroll(e) {
      if (this.direction === 'x') {
        const { scrollLeft, scrollWidth, offsetWidth } = e.target

        if (scrollLeft < 1 || scrollLeft + offsetWidth === scrollWidth) {
          this.preventDefault = false
        }
      } else {
        const { scrollTop, scrollHeight, offsetHeight } = e.target

        if (scrollTop < 1 || scrollTop + offsetHeight === scrollHeight) {
          this.preventDefault = false
        }
      }
    },
    onTouchstart(e) {
      this.lastPosition.x = e.touches[0].clientX
      this.lastPosition.y = e.touches[0].clientY

      if (!this.preventDefault) {
        this.$scroll.addEventListener('touchmove', this.onOnceTouchmove, {
          once: true
        })
      }
    },
    onTouchmove(e) {
      if (!this.preventDefault) {
        return
      }

      e.preventDefault()

      let nextPosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }

      let move

      if (this.direction === 'x') {
        move = nextPosition.x - this.lastPosition.x
      } else {
        move = nextPosition.y - this.lastPosition.y
      }

      this.$scroll.scrollTop -= move

      this.lastPosition.x = nextPosition.x
      this.lastPosition.y = nextPosition.y
    },
    onOnceTouchmove(e) {
      const nextPosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }

      let initScroll = false

      if (this.direction === 'x') {
        initScroll = this.lastPosition.x > nextPosition.x
      } else {
        initScroll = this.lastPosition.y > nextPosition.y
      }

      if (initScroll) {
        this.$scroll.addEventListener(
          'touchend',
          () => {
            this.preventDefault = true
          },
          {
            once: true
          }
        )
      }
    }
  }
}
</script>
