<template>
  <a-position :class="{ active: active, visible: visible }" class="a-popup" position="fixed" z-index="100" top="0" bottom="0" left="0" right="0">
    <a-position z-index="1" top="0" bottom="0" left="0" right="0" background-color="rgba(0,0,0,0.7)" @a-tap="iBgClose ? close() : null"></a-position>

    <a-position class="a-popup-item" v-bind="slot.position" v-for="slot in iSlots" :key="slot.name" :class="{ active: slot.active }">
      <slot :name="slot.name" :row="slot.row" :active="slot.active"></slot>
    </a-position>
  </a-position>
</template>

<script>
import APosition from './Position'

import getKeysValue from '../../utils/getKeysValue'

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
      visible: false,

      visibleSlots: [],

      openHandler: Promise.resolve(),

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
      }
    }
  },

  computed: {
    iSlots() {
      return this.slotNames.reduce((slots, name, index) => {
        let options = { ...this.defaultOptions }

        let visibleIndex = this.visibleSlots.findIndex(i => i.name === name)
        let visible = this.visibleSlots[visibleIndex]

        if (visible) {
          options = {
            ...options,
            ...visible.options
          }
        }

        let position = {
          ...getKeysValue(['zIndex', 'top', 'left', 'center'], options)
        }
        if (visible) {
          position.zIndex = String(10 + visibleIndex)
        } else {
          position.top = '0'
          position.left = '150%'
          delete position.center
        }

        slots.push({
          active: !!visible,
          name,
          position,
          row: visible ? visible.row : {}
        })

        return slots
      }, [])
    },

    iBgClose() {
      let use = this.visibleSlots[0] || this.defaultOptions
      return this.visibleSlots.length === 1 && !!use.options.bgClose
    }
  },

  mounted() {
    this.$parent.$refs['a-popup'] = this
  },

  methods: {
    open({ name, row = {}, options = {}, beforeOpen, afterOpen } = {}) {
      if (this.slotNames.indexOf(name) === -1) {
        return
      }

      this.openHandler = this.openHandler.then(() => {
        this.$emit('beforeOpen')

        Promise.resolve(typeof beforeOpen === 'function' && beforeOpen()).then(
          p => {
            this.active = this.visible = true

            this.visibleSlots.push({
              name,
              row,
              close: 0,
              options: getKeysValue(
                ['bgClose', 'zIndex', 'top', 'left', 'center'],
                options
              )
            })

            this.$emit('afterOpen')

            typeof afterOpen === 'function' && afterOpen(p)
          }
        )
      })
    },

    close({ name = '', beforeClose, afterClose } = {}) {
      if (
        name &&
        (this.slotNames.indexOf(name) === -1 ||
          !this.visibleSlots.find(i => i.name === name))
      ) {
        return
      }

      this.$emit('beforeClose')

      Promise.resolve(
        typeof beforeClose === 'function' && beforeClose(this.row)
      ).then(p => {
        p = p || this.row

        this.$emit('afterClose')

        if (name && this.visibleSlots.length > 1) {
          this.visibleSlots.splice(
            this.visibleSlots.findIndex(i => i.name === name),
            1
          )
        } else {
          this.$set(this, 'visibleSlots', [])
        }

        if (this.visibleSlots.length === 0) {
          this.active = false
        }

        this.openHandler = this.openHandler.then(() =>
          new Promise(r => {
            setTimeout(r, 300)
          }).then(() => {
            if (this.visibleSlots.length === 0) {
              this.visible = false
            }
            this.$emit('afterCloseAnimation')
            typeof afterClose === 'function' && afterClose(p)
          })
        )
      })
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
