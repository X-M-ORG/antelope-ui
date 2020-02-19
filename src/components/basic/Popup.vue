<template>
  <a-position
    :class="{ active: active }"
    class="a-popup"
    mode="fixed"
    z-index="100"
    top="0"
    bottom="0"
    left="0"
    right="0"
  >
    <a-position
      z-index="1"
      top="0"
      bottom="0"
      left="0"
      right="0"
      background-color="rgba(0,0,0,0.7)"
      @a-tap="iOptions.bgClose ? close() : null"
    ></a-position>

    <a-position
      class="a-popup-item"
      v-bind="slotPosition[name]"
      v-for="name in slotNames"
      :key="name"
      :class="{ active: name === activeName }"
    >
      <slot :name="name" :row="row"></slot>
    </a-position>
  </a-position>
</template>

<script>
import APosition from './Position'

import { getKeysValue } from '../../utils'

export default {
  components: {
    APosition
  },

  props: {
    slotNames: {
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
      active: false,
      activeName: '',
      row: {},

      defaultOptions: {
        bgClose: false,
        zIndex: '2',
        top: '50%',
        left: '50%',
        center: '1',
        ...getKeysValue(
          ['bgClose', 'zIndex', 'top', 'left', 'center'],
          this.options
        )
      },

      activeOptions: {}
    }
  },

  computed: {
    iOptions() {
      return {
        ...this.defaultOptions,
        ...this.activeOptions
      }
    },

    slotPosition() {
      let defaultPosition = getKeysValue(
        ['zIndex', 'top', 'left', 'center'],
        this.iOptions
      )

      return this.slotNames.reduce((position, name) => {
        position[name] = { ...defaultPosition }

        if (this.activeName !== name) {
          position[name].top = '0'
          position[name].left = '150%'
          delete position[name].center
        }

        return position
      }, {})
    }
  },

  mounted() {
    this.$parent.$refs['a-popup'] = this
  },

  methods: {
    open({ name, row = {}, params = {}, beforeOpen, afterOpen } = {}) {
      if (this.slotNames.indexOf(name) === -1) {
        return
      }

      this.$set(
        this,
        'activeOptions',
        getKeysValue(['bgClose', 'zIndex', 'top', 'left', 'center'], params)
      )

      this.$emit('beforeOpen')

      Promise.resolve(typeof beforeOpen === 'function' && beforeOpen()).then(
        p => {
          this.active = true
          this.activeName = name
          this.row = row

          this.$emit('afterOpen')

          typeof afterOpen === 'function' && afterOpen(p)
        }
      )
    },

    close({ beforeClose, afterClose } = {}) {
      this.$emit('beforeClose')

      Promise.resolve(
        typeof beforeClose === 'function' && beforeClose(this.row)
      ).then(p => {
        p = p || this.row

        this.active = false

        this.$emit('afterClose')

        setTimeout(() => {
          this.activeName = ''
          this.row = {}
          this.$set(this, 'activeOptions', {})

          this.$emit('afterCloseAnimation')

          typeof afterClose === 'function' && afterClose(p)
        }, 300)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.a-popup {
  transform: translateX(150%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s linear;

  &.active {
    transform: translateX(0);
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
