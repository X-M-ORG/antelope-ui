<template>
  <a-position class="popup" :class="{ active: active, visible: visible }" position="fixed" z-index="1000" top="0" bottom="0" left="0" right="0">
    <a-position v-for="slot in iSlots" :key="'popup-item-' + slot.name" class="popup-item" :class="{ active: slot.active }" :z-index="slot.activeIndex" top="0" bottom="0" left="0" right="0">
      <a-position z-index="1" top="0" bottom="0" left="0" right="0" background-color="rgba(0,0,0,0.7)" @a-tap="slot.options.bgClose ? close(slot.name) : null"></a-position>
      <a-position z-index="2" v-bind="slot.position">
        <slot :name="slot.name" :active="slot.active" :data="slot.data"></slot>
      </a-position>
    </a-position>
  </a-position>
</template>

<script>
import APosition from '../basic/Position'

import getPropsValue from '../../utils/getPropsValue'

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
        zIndex: 1,
        top: '50%',
        left: '50%',
        center: 'x+y'
      },

      // 已开启的
      activeSlots: []
    }
  },

  computed: {
    iSlots() {
      return this.items.reduce((slots, name) => {
        // 若已开启则取已有的参数
        const activeIndex = this.activeSlots.findIndex((i) => i.name === name)
        const activeData = this.activeSlots[activeIndex]
        const options = {
          ...this.defaultOptions,
          ...(activeData ? activeData.options : {})
        }

        slots.push({
          activeIndex,
          active: activeData ? activeData.active : false,
          name,
          options,
          position: {
            top: '0',
            left: '150%',
            ...(activeData
              ? getPropsValue(options, ['top', 'left', 'center'])
              : {})
          },
          data: activeData ? activeData.data : undefined
        })

        return slots
      }, [])
    }
  },

  mounted() {
    Object.assign(this.defaultOptions, getPropsValue(this, 'options'))
  },

  methods: {
    open(opt = {}) {
      if (typeof opt === 'string') {
        opt = { name: opt }
      }

      const { name, options = {}, data } = opt

      if (
        this.items.indexOf(name) === -1 ||
        this.activeSlots.findIndex((i) => i.name === name) > -1
      ) {
        return
      }

      return new Promise((r) => {
        this.active = this.visible = true

        this.activeSlots.push({
          active: true,
          name,
          options,
          data
        })

        setTimeout(() => {
          r()
        }, 300)
      })
    },

    close(names = []) {
      names = []
        .concat(names)
        .filter(
          (name) =>
            this.items.indexOf(name) > -1 &&
            this.activeSlots.findIndex((i) => i.name === name) > -1
        )

      if (!names.length) {
        names = this.activeSlots.map((i) => i.name)
      }

      return new Promise((r) => {
        // 若将关闭的和剩余的一致，则留在动画结束后关闭
        if (this.activeSlots.length === names.length) {
          this.active = false

          setTimeout(() => {
            this.visible = false
            this.$set(this, 'activeSlots', [])
            r()
          }, 300)
        } else {
          names.forEach((name) => {
            const index = this.activeSlots.findIndex((i) => i.name === name)
            if (index > -1) {
              this.activeSlots[index].active = false
            }
          })

          setTimeout(() => {
            this.$set(
              this,
              'activeSlots',
              this.activeSlots.filter(({ name }) =>
                names.find((i) => i !== name)
              )
            )
            r()
          }, 300)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.popup
  pointer-events none
  opacity 0
  transform translateX(200%)
  transition opacity 0.3s linear

  &.visible
    transform translateX(0)

  &.active
    pointer-events auto
    opacity 1

  .popup-item
    opacity 0
    transition opacity 0.3s linear

    &.active
      opacity 1
</style>
