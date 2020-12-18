<template>
  <div :style="listStyle">
    <div ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

import status from '../../mixins/status'
import box from '../../mixins/box'
import position from '../../mixins/position'
import event from '../../mixins/event'

const BScrollEvents = [
  'beforeScrollStart',
  'scrollStart',
  'scroll',
  'scrollCancel',
  'scrollEnd',
  'touchEnd',
  'flick',
  'refresh',
  'destroy',
  'pullingDown',
  'pullingUp',
  'zoomStart',
  'zoomEnd'
]

const expandEvent = ['comingTop', 'comingBottom']

export default {
  mixins: [status, box, position, event],

  props: {
    options: {
      type: Object,
      default: () => ({})
    },

    expandOptions: {
      type: Object,
      default: () => ({ coming: 200 })
    }
  },

  data() {
    return {
      isFirstInTop: true,
      disabledComingTopEvent: false,
      disabledComingBottomEvent: false,

      V: null,
      lastX: 0,
      lastY: 0
    }
  },

  computed: {
    listStyle() {
      return {
        overflow: 'hidden',
        ...this.mPositionStyle
      }
    }
  },

  mounted() {
    this.initScroll()
    this.listenerScroll()
  },

  methods: {
    initScroll() {
      this.V = new BScroll(this.$el, {
        startX: this.lastX,
        startY: this.lastY,
        probeType: 2,
        bounce: false,
        momentum: false,
        ...this.options
      })

      Object.keys(this.$listeners).forEach((name) => {
        const e = BScrollEvents.find(
          (i) =>
            i.toLocaleLowerCase() === name.replace(/-/g, '').toLocaleLowerCase()
        )

        if (e) {
          this.V.on(e, (...arg) => {
            this.$emit(name, ...arg)
          })
        }
      })

      Object.keys(this.$listeners).forEach((name) => {
        const e = expandEvent.find(
          (i) =>
            i.toLocaleLowerCase() === name.replace(/-/g, '').toLocaleLowerCase()
        )

        if (e && e.indexOf('coming') > -1) {
          const { coming } = this.expandOptions

          if (e === 'comingTop') {
            this.V.on('scroll', (...arg) => {
              if (this.disabledComingTopEvent) {
                return
              }

              if (this.isFirstInTop) {
                if (this.V.y < 0 && Math.abs(this.V.y) >= coming) {
                  this.isFirstInTop = false
                }
                return
              }

              if (Math.abs(this.V.y) <= coming) {
                this.disabledComingTopEvent = true
                Promise.resolve(this.$listeners[name](...arg)).then(() => {
                  this.disabledComingTopEvent = false
                })
              }
            })
          } else {
            this.V.on('scroll', (...arg) => {
              if (this.disabledComingBottomEvent) {
                return
              }

              if (this.V.y - this.V.maxScrollY <= coming) {
                this.disabledComingBottomEvent = true
                Promise.resolve(this.$listeners[name](...arg)).then(() => {
                  this.disabledComingBottomEvent = false
                })
              }
            })
          }
        }
      })

      this.V.on('scrollEnd', () => {
        if (
          (this.V.y === 0 && this.V.movingDirectionY === -1) ||
          (this.V.y === this.V.maxScrollY && this.V.movingDirectionY === 1)
        ) {
          if (this.V.enabled) {
            this.V.destroy()
            this.V.enabled = false
            this.lastX = this.V.x
            this.lastY = this.V.y
          }
        }
      })
    },

    listenerScroll() {
      const el = this.$refs.content

      let initScroll = false

      el.addEventListener('touchstart', (e1) => {
        initScroll = false

        if (!this.V.enabled) {
          el.addEventListener(
            'touchmove',
            (e2) => {
              const v = e2.touches[0].screenY - e1.touches[0].screenY

              if (
                (this.V.y === 0 && v < 0) ||
                (this.V.y === this.V.maxScrollY && v > 0)
              ) {
                initScroll = true
              }
            },
            { once: true }
          )
        }
      })

      el.addEventListener('touchend', (e) => {
        initScroll && this.initScroll()
      })
    }
  }
}
</script>
