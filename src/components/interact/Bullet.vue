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

      // 暂停、暂停计时
      paused: false,
      pauseTime: 0,

      // 最后一次启动的 index 和 time
      lastBeginIndex: 0,
      lastBeginTime: 0,

      // 下一次启动的 index 和定时器
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
      }
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

      const beginIndex = this.nextBeginIndex
      const prevIndex = this.lastBeginIndex
      const beginRef = this.$refs.bullet[beginIndex]
      const prevRef = this.$refs.bullet[prevIndex]

      let beginDelay = 0

      if (new Set(prevRef.classList).has('move')) {
        const moveTime = this.getBulletMoveTime(prevIndex)
        const timeSpace = Date.now() - this.lastBeginTime
        if (timeSpace - this.pauseTime < moveTime) {
          beginDelay = moveTime - (timeSpace - this.pauseTime)
        }
      }

      setTimeout(() => {
        this.pauseTime = 0

        const now = Date.now()
        const moveTime = this.getBulletMoveTime(beginIndex)

        this.lastBeginIndex = beginIndex
        this.lastBeginTime = now

        beginRef.classList.add('move')

        this.moveTimer[beginIndex] = {
          ref: beginRef,
          residue: duration,
          begin: now,
          timer: setTimeout(() => {
            delete this.moveTimer[beginIndex]
            beginRef.classList.remove('move')
          }, duration)
        }

        const i = beginIndex
        this.nextBeginIndex = this.bullets.length - 1 === i ? 0 : i + 1
        this.nextBeginTimer = setTimeout(this.beginAnimation, moveTime)
      }, beginDelay)
    },
    endAnimation() {
      clearTimeout(this.nextBeginTimer)
      this.nextBeginTimer = 0
    },

    playAnimation() {
      const now = Date.now()

      this.paused = false
      this.pauseTime = now - this.pauseTime

      Object.keys(this.moveTimer).forEach((i) => {
        const { ref, residue } = this.moveTimer[i]

        this.moveTimer[i].begin = now
        this.moveTimer[i].timer = setTimeout(() => {
          delete this.moveTimer[i]
          ref.classList.remove('move')
        }, residue)
      })

      this.beginAnimation()
    },
    pauseAnimation() {
      const now = Date.now()

      this.paused = true
      this.pauseTime = now

      this.endAnimation()
      Object.keys(this.moveTimer).forEach((i) => {
        const { residue, begin, timer } = this.moveTimer[i]

        clearTimeout(timer)
        this.moveTimer[i].residue = residue - (now - begin)
      })
    },

    getBulletMoveTime(index) {
      const bullet = this.$refs.bullet[index]
      const bulletContainerWidth = bullet.offsetWidth
      const moveSpeed = (bulletContainerWidth * 2.5) / Number(this.duration)

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
