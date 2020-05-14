<template>
  <a-position :class="{ active: active, visible: visible }" class="a-popup" position="fixed" z-index="100" top="0" bottom="0" left="0" right="0">
    <a-position z-index="1" top="0" bottom="0" left="0" right="0" background-color="rgba(0,0,0,0.7)" @a-tap="iBgClose ? close() : null"></a-position>

    <a-position class="a-popup-item" v-bind="slot.position" v-for="slot in iSlots" :key="slot.name" :class="{ active: slot.active }">
      <slot :name="slot.name" :active="slot.active" :data="slot.data"></slot>
    </a-position>
  </a-position>
</template>

<script>
import APosition from '@/components/basic/Position'

import getPropsValue from '@/utils/getPropsValue'

export default {
  components: {
    APosition
  },

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

  data() {
    return {
      /*
        组件状态
        active 控制组件是否激活，此值控制浮层的渐隐渐现
        visible 控制组件是否显示，此值控制浮层是否载入可见区域视图
      */
      active: false,
      visible: false,

      // 初始属性
      defaultOptions: {
        bgClose: false,
        zIndex: '2',
        top: '50%',
        left: '50%',
        center: '1'
      },

      // 已开启的
      visibleSlots: []
    }
  },

  computed: {
    iSlots() {
      return this.items.reduce((slots, name) => {
        // 若已开启则取已有的数据
        const visibleIndex = this.visibleSlots.findIndex(i => i.name === name)
        const visibleInfo = this.visibleSlots[visibleIndex] || null
        const options = {
          ...this.defaultOptions,
          ...(visibleInfo ? visibleInfo.options : {})
        }

        // 根据激活情况确定定位
        let position = { top: '0', left: '150%' }
        if (visibleInfo) {
          Object.assign(
            position,
            { zIndex: String(10 + visibleIndex) },
            getPropsValue(options, ['top', 'left', 'center'])
          )
        }

        slots.push({
          active: !!visibleInfo,
          name,
          position,
          data: visibleInfo ? visibleInfo.data : {}
        })

        return slots
      }, [])
    },

    iBgClose() {
      const { length } = this.visibleSlots
      const options = length
        ? this.visibleSlots[length - 1].options
        : this.defaultOptions

      return !!options.bgClose
    }
  },

  mounted() {
    this.$parent.$refs['a-popup'] = this

    Object.assign(this.defaultOptions, getPropsValue(this, 'options'))
  },

  methods: {
    open({ name, options = {}, data = {} } = {}) {
      if (
        this.items.indexOf(name) === -1 ||
        this.visibleSlots.findIndex(i => i.name === name) > -1
      ) {
        return
      }

      this.active = this.visible = true
      this.visibleSlots.push({
        name,
        options: getPropsValue(options, [
          'bgClose',
          'zIndex',
          'top',
          'left',
          'center'
        ]),
        data
      })

      return new Promise(r => {
        setTimeout(() => {
          r()
        }, 1000)
      })
    },

    close(names = []) {
      names = [].concat(names)

      if (!names.length) {
        names = this.visibleSlots.map(i => i.name)
      }

      names = names.filter(
        name =>
          this.items.indexOf(name) > -1 &&
          this.visibleSlots.findIndex(i => i.name === name) > -1
      )

      if (!names.length) {
        return
      }

      // 若将关闭的和剩余的一致，则留在动画结束后关闭
      if (this.visibleSlots.length === names.length) {
        return new Promise(r => {
          this.active = false

          setTimeout(() => {
            this.visible = false
            this.$set(this, 'visibleSlots', [])
            r()
          }, 300)
        })
      } else {
        this.$set(
          this,
          'visibleSlots',
          this.visibleSlots.filter(({ name }) => names.find(i => i !== name))
        )
        return new Promise(r => {
          setTimeout(() => {
            r()
          }, 300)
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.a-popup {
  transform: translateX(150%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s linear;

  &.visible {
    transform: translateX(0);
  }

  &.active {
    pointer-events: auto;
    opacity: 1;
  }

  .a-popup-item {
    opacity: 0;
    transition: opacity 0.3s linear;

    &.active {
      opacity: 1;
    }
  }
}
</style>
