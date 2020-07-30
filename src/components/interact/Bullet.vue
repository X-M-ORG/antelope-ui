<template>
  <div :style="bulletStyle">
    <div ref="bullet" class="bullet" v-for="(data, index) in bullets" :key="index" :style="{ animationDuration: duration + 's', animationPlayState: paused ? 'paused' : 'running' }">
      <div class="bullet-item" v-html="data" v-if="mode === 'text'"></div>
      <div class="bullet-item" v-else-if="mode === 'slot'">
        <slot :index="index" :data="data"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import status from '@/mixins/status'
import box from '@/mixins/box'
import position from '@/mixins/position'
import event from '@/mixins/event'

export default {
  mixins: [status, box, position, event],

  props: {
    items: {
      type: Array,
      default: () => []
    },

    mode: {
      validator: (v) => ['text', 'slot'].indexOf(v) !== -1,
      default: 'text'
    },

    duration: {
      type: String,
      default: '20'
    },

    between: {
      type: String,
      default: '50'
    }
  },

  computed: {
    bulletStyle() {
      return {
        overflow: 'hidden',
        ...this.mPositionStyle
      }
    }
  },

  data() {
    return {
      nextTimer: 0,
      nextIndex: 0,
      nextAnimation: () => {},

      bullets: [].concat(this.items),

      index: 0,
      paused: false,
      pauseTime: 0
    }
  },

  watch: {
    items(newValue, oldValue) {
      if (newValue.length && !oldValue.length) {
        this.bullets = [].concat(newValue)
        this.$nextTick(() => {
          this.beginAnimation()
        })
      } else if (newValue.length && oldValue.length) {
        this.bullets.splice.apply(this.bullets, [
          this.nextIndex,
          this.bullets.length - this.nextIndex,
          ...newValue
        ])
      } else {
        this.endAnimation()
      }
    }
  },

  mounted() {
    this.bullets.length && this.beginAnimation()
  },
  destroyed() {
    this.endAnimation()
  },

  methods: {
    beginAnimation() {
      const index = this.nextIndex

      let bullet = this.$refs.bullet[index]

      // 基础属性：滚动时间、最小间隔、最大间隔、屏幕宽度
      const duration = Number(this.duration)
      const [minBetween, maxBetween] = this.between
        .split('-')
        .map((i) => Number(i))
      const viewWidth = bullet.offsetWidth

      // 执行弹幕
      bullet.classList.add('move')
      setTimeout(() => {
        bullet.classList.remove('move')
      }, duration * 1000)

      // 计算当前弹幕完全进入视图的时间
      let bulletMove = bullet.firstChild.offsetWidth
      if (minBetween) {
        bulletMove += minBetween
      }
      if (maxBetween) {
        bulletMove += (maxBetween - minBetween) * Math.random()
      }
      let moveTime = bulletMove / ((viewWidth * 2.5) / duration)

      // 设定下一次执行的相关参数
      this.nextIndex = this.bullets.length - 1 === index ? 0 : index + 1
      this.nextAnimation = this.beginAnimation
      this.nextTimer = setTimeout(
        this.nextAnimation,
        moveTime * 1000 + this.pauseTime
      )
    },
    endAnimation() {
      this.nextTimer && clearTimeout(this.nextTimer)

      this.nextTimer = 0
      this.nextIndex = 0
      this.nextAnimation = () => {}
    },

    playAnimation() {
      this.paused = false
      this.pauseTime = Date.now() - this.pauseTime
      this.beginAnimation()
    },
    pauseAnimation() {
      this.paused = true
      this.pauseTime = Date.now()
      this.endAnimation()
    }
  }
}
</script>

<style lang="stylus" scoped>
.bullet
  position absolute
  left 0
  top 0
  bottom 0
  right 0
  white-space nowrap
  transform translateX(100%)

  .bullet-item
    display inline-block

  &.move
    animation bulletMove linear 1

@keyframes bulletMove
  0%
    transform translateX(100%)

  100%
    transform translateX(-150%)
</style>
