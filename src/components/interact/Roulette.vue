<template>
  <div :style="mixins_position_style">
    <a-position v-for="(item, index) in cItems" :key="index" v-bind="item.style">
      <slot :index="item.index" :active="item.active" :row="item.row"></slot>
    </a-position>

    <audio ref="audio" v-if="audio" :src="audio" preload="auto"></audio>
  </div>
</template>

<script>
import APosition from '@/components/basic/Position'

import status from '@/mixins/status'
import box from '@/mixins/box'
import position from '@/mixins/position'
import event from '@/mixins/event'

import getPropsValue from '@/utils/getPropsValue'

export default {
  components: {
    APosition
  },

  mixins: [status, box, position, event],

  props: {
    items: {
      type: Array,
      default: () => []
    },

    itemStyle: {
      type: Object,
      default: () => ({})
    },

    audio: {
      type: String,
      default: ''
    }
  },

  computed: {
    cItems() {
      return this.items.map((item, index) => ({
        index,
        active: index === this.activeIndex,
        style: {
          ...this.itemStyle,
          ...item.position
        },
        row: item.row || {}
      }))
    },

    iOptions() {
      let options = {
        ...this.defaultOptions,
        ...this.activeOptions
      }

      let { maxSpeed, minSpeed, toMaxStep } = options
      options.acceleration = (minSpeed - maxSpeed) / toMaxStep

      return options
    }
  },

  data() {
    return {
      activeIndex: -1,

      defaultOptions: {
        func: 'ease-in-out', // 速度曲线
        maxSpeed: 30, // 最快的速度到下一个
        minSpeed: 960, // 最慢的速度到下一个
        toMaxStep: 4 // 几步到达最快速度
      },

      activeOptions: {}
    }
  },

  methods: {
    start({
      options = {},
      steps = this.items.length,
      result = 0,
      beforeStart,
      afterStart,
      afterEnd
    } = {}) {
      this.$set(
        this,
        'activeOptions',
        getPropsValue(options, ['func', 'maxSpeed', 'minSpeed', 'toMaxStep'])
      )

      this.$emit('beforeStart')

      if (this.$refs.audio) {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
      }

      Promise.resolve(typeof beforeStart === 'function' && beforeStart()).then(
        () => {
          this.$emit('afterStart')
          typeof afterStart === 'function' && afterStart()

          this.$emit('beforeEnd')
          this.jumpMain(this.getTotalSteps({ steps, result })).then(() => {
            this.$emit('afterEnd')

            typeof afterEnd === 'function' && afterEnd()
          })
        }
      )
    },
    init() {
      this.activeIndex = -1
      this.$set(this, 'activeOptions', {})
    },

    // 主执行函数
    jumpMain(total) {
      return new Array(total)
        .join()
        .split(',')
        .reduce(
          (main, i, index) =>
            main.then(
              () =>
                new Promise(resolve => {
                  setTimeout(
                    () => {
                      this.activeIndex = this.getNextActive({ index, total })
                      resolve()
                    },
                    index ? this.getSpeed({ index, total }) : 0
                  )
                })
            ),
          Promise.resolve()
        )
    },

    /*
      工具
      getTotalSteps 获取具体要走的步数
      getSpeed 获取当前到达下一步的时间
      getNextActive 获取下一步的 index
    */
    getTotalSteps({ steps, result }) {
      let lastJump = result + 1
      let prevJump = steps - lastJump
      let firstJump = prevJump % this.items.length

      this.activeIndex = this.items.length - firstJump - 1

      return steps
    },
    getSpeed({ index, total }) {
      const {
        func,
        maxSpeed,
        minSpeed,
        toMaxStep,
        acceleration
      } = this.iOptions

      if (index > toMaxStep && index < total - toMaxStep - 1) {
        return maxSpeed
      }

      if (index <= toMaxStep) {
        if (func === 'ease-out') {
          return maxSpeed
        } else {
          return minSpeed - acceleration * (index - 1)
        }
      }

      if (index >= total - toMaxStep - 1) {
        if (func === 'ease-in') {
          return maxSpeed
        } else {
          return maxSpeed + (index - (total - toMaxStep - 2)) * acceleration
        }
      }
    },
    getNextActive() {
      const nextIndex = this.activeIndex + 1
      return nextIndex === this.items.length ? 0 : nextIndex
    }
  }
}
</script>
