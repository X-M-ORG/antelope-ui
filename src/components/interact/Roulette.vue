<template>
  <div :style="mPositionStyle">
    <a-position v-for="(item, index) in iItems" :key="index" v-bind="item.style">
      <slot :index="item.index" :active="item.active" :data="item.data"></slot>
    </a-position>
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

    options: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    iItems() {
      return this.items.map((item, index) => ({
        index,
        active: index === this.activeIndex,
        style: {
          ...this.options,
          ...item.position
        },
        data: item.data || {}
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
    run({ steps = this.items.length, result = -1, options = {} } = {}) {
      this.$set(
        this,
        'activeOptions',
        getPropsValue(options, ['func', 'maxSpeed', 'minSpeed', 'toMaxStep'])
      )

      return this.jumpMain(this.getTotalSteps({ steps, result }))
    },
    init() {
      this.activeIndex = -1
      this.$set(this, 'activeOptions', {})
    },

    // 主执行函数
    jumpMain(total) {
      return [...Array(total)]
        .reduce(
          (main, i, index) =>
            main.then(
              () =>
                new Promise((resolve) => {
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
      if (result !== -1) {
        let lastJump = result + 1 // 最后一圈走的步数
        let prevJump = steps - lastJump // 前面N圈总计要走的步数
        let firstJump = prevJump % this.items.length // 第一圈要走的步数

        this.activeIndex = this.items.length - firstJump - 1
      }

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
