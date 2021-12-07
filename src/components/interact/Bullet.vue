<template>
  <div :style="bulletStyle">
    <div
      ref="bullet"
      class="bullet"
      :class="direction"
      v-for="(data, index) in bullets"
      :key="index"
      :style="{
        animationDuration: duration + 's',
        animationPlayState: paused ? 'paused' : 'running'
      }"
    >
      <div class="bullet-item" v-html="data" v-if="mode === 'text'"></div>
      <div class="bullet-item" v-else-if="mode === 'slot'">
        <slot :index="index" :data="data"></slot>
      </div>
    </div>
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
    direction: {
      type: String,
      default: 'rtl'
    },

    items: {
      type: Array,
      default: () => []
    },

    mode: {
      validator: (v) => ['text', 'slot'].indexOf(v) !== -1,
      default: 'text'
    },

    duration: {
      type: [Number, String],
      default: '20'
    },

    between: {
      type: [Number, String],
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
      bullets: [].concat(this.items),

      // 暂停、开始暂停的时间
      paused: false,
      beginPaused: 0,

      // 最后一次启动的 index 和 time
      lastBeginIndex: 0,
      lastBeginTime: 0,

      // 下一次启动的 index 和 time
      nextBeginIndex: 0,
      nextBeginTimer: 0,

      // 移动的弹幕控制
      moveTimer: {
        // 0: {
        //   ref: null,
        //   residue: 0,
        //   begin: 0,
        //   timer: 0
        // }
      },

      // 延迟执行下一个弹幕的计时器
      beginDelayTimer: 0
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
          this.nextBeginIndex,
          this.bullets.length - this.nextBeginIndex,
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
      const duration = Number(this.duration) * 1000

      const nextIndex = this.nextBeginIndex
      const nextRef = this.$refs.bullet[nextIndex]

      const lastIndex = this.lastBeginIndex
      const lastRef = this.$refs.bullet[lastIndex]

      let beginDelay = 0

      if (lastRef && new Set(lastRef.classList).has('move')) {
        const { residue } = this.moveTimer[lastIndex]

        if (residue !== duration) {
          const moveTime = this.getBulletMoveTime(lastRef)
          const hasMoveTime = duration - residue

          if (hasMoveTime < moveTime) {
            beginDelay = moveTime - hasMoveTime
          }
        }
      }

      this.beginDelayTimer = setAnimationTimeout(() => {
        const now = Date.now()
        const moveTime = this.getBulletMoveTime(nextRef)

        this.lastBeginIndex = nextIndex
        this.lastBeginTime = now

        nextRef.classList.add('move')

        this.moveTimer[nextIndex] = {
          ref: nextRef,
          residue: duration,
          begin: now,
          timer: setAnimationTimeout(() => {
            nextRef.classList.remove('move')
            delete this.moveTimer[nextIndex]
          }, duration)
        }

        const i = nextIndex
        this.nextBeginIndex = this.bullets.length - 1 === i ? 0 : i + 1
        this.nextBeginTimer = setAnimationTimeout(this.beginAnimation, moveTime)
      }, beginDelay)
    },
    endAnimation() {
      clearAnimationTimeout(this.nextBeginTimer)
      this.nextBeginTimer = 0
    },

    playAnimation() {
      // 继续已出现的弹幕的结束任务、开始下一次的进场
      this.paused = false

      Object.keys(this.moveTimer).forEach((i) => {
        const { ref, residue } = this.moveTimer[i]

        this.moveTimer[i].begin = Date.now()
        this.moveTimer[i].timer = setAnimationTimeout(() => {
          ref.classList.remove('move')
          delete this.moveTimer[i]
        }, residue)
      })

      this.beginAnimation()
    },
    pauseAnimation() {
      // 记录停止时间、停止已出现的弹幕的结束任务、停止下一次的进场

      this.paused = true
      this.beginPaused = Date.now()

      this.endAnimation()

      Object.keys(this.moveTimer).forEach((i) => {
        const { residue, begin, timer } = this.moveTimer[i]

        clearAnimationTimeout(timer)
        this.moveTimer[i].residue = residue - (this.beginPaused - begin)
      })

      if (this.beginDelayTimer) {
        clearAnimationTimeout(this.beginDelayTimer)
        this.beginDelayTimer = 0
      }
    },

    getBulletMoveTime(bullet) {
      const moveSpeed = (bullet.offsetWidth * 2.5) / Number(this.duration)

      let bulletMoveWidth = bullet.firstChild.offsetWidth

      const [minBetween, maxBetween] = this.between
        .split('-')
        .map((i) => Number(i))
      if (minBetween) {
        bulletMoveWidth += minBetween
      }
      if (maxBetween) {
        bulletMoveWidth += (maxBetween - minBetween) * Math.random()
      }

      return Math.floor((bulletMoveWidth / moveSpeed) * 1000)
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

  .bullet-item
    display inline-block

  &.rtl
    transform translateX(100%)

    &.move
      animation bulletMoveRTL linear 1

  &.ltr
    transform translateX(-150%)

    &.move
      animation bulletMoveLTR linear 1

@keyframes bulletMoveRTL
  0%
    transform translateX(100%)

  100%
    transform translateX(-150%)

@keyframes bulletMoveLTR
  0%
    transform translateX(-150%)

  100%
    transform translateX(150%)
</style>
