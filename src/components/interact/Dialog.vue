<template>
  <a-position class="dialog" :class="{ active: active, visible: visible }" position="fixed" :z-index="zIndex" position-set="0">
    <a-position z-index="1" position-set="0" background-color="rgba(0,0,0,0.7)" :disabled="!options.bgClose" @a-tap="close()"></a-position>
    <a-position z-index="2" v-bind="{ center: 'x+y', ...$attrs, ...attrs}">
      <slot :data="data"></slot>
    </a-position>
  </a-position>
</template>

<script>
import { getConfig } from '../../config'

import APosition from '../basic/Position'

export default {
  components: {
    APosition
  },

  props: {
    name: {
      type: String,
      default: ''
    },
    cache: {
      type: Boolean,
      default: false
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

      zIndex: 0,

      data: null,
      attrs: {},
      options: { bgClose: false },
      onclose: () => {}
    }
  },

  created() {
    const { dialogProperty } = getConfig()
  
    this[dialogProperty][this.name] = this
  },

  methods: {
    open({ data = {}, attrs = {}, options = {}, onclose = () => {} } = {}) {
      const { dialogProperty } = getConfig()

      this.zIndex = Object.keys(this[dialogProperty]).reduce((n, i) => {
        if (this[dialogProperty][i].active) {
          n += 100
        }
        return n
      }, 5000)

      this.$set(this, 'data', data)
      this.$set(this, 'attrs', attrs)
      this.$set(this, 'options', { bgClose: false, ...options })
      this.$set(this, 'onclose', onclose)

      return new Promise((r) => {
        this.active = this.visible = true

        if (this[dialogProperty].$active++ === 0) {
          document.body.style.overflow = 'hidden'
        }

        setTimeout(() => {
          r()
        }, 300)
      })
    },

    close(others) {
      const { dialogProperty } = getConfig()

      if (others) {
        const { all = false, other = [] } = others
        const names = all
          ? Object.keys(this[dialogProperty]).filter(
              (i) => this[dialogProperty][i].active
            )
          : [].concat(other)
        names.forEach((name) => this[dialogProperty][name].close())
      }

      const { onclose, data } = this

      return new Promise((r) => {
        this.active = false

        setTimeout(() => {
          this.visible = false

          if (this[dialogProperty].$active-- === 1) {
            document.body.style.overflow = null
          }

          if(!this.cache) {
            this.$set(this, 'data', null)
          }
          this.$set(this, 'attrs', {})
          this.$set(this, 'options', { bgClose: false })
          this.$set(this, 'onclose', () => {})
          r()
        }, 300)
      }).then(() => onclose({ name: this.name, data }))
    },

    update(data) {
      this.$set(this, 'data', data)
    }
  }
}
</script>

<style lang="stylus" scoped>
.dialog
  pointer-events none
  opacity 0
  transform translateX(200%)
  transition opacity 0.3s linear

  &.visible
    transform translateX(0)

  &.active
    pointer-events auto
    opacity 1
</style>
