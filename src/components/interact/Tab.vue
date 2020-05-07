<template>
  <div :style="tabStyle">
    <slot name="tab-bar" :active="active"></slot>

    <a-position class="a-tab-item" v-for="(item, index) in cItems" :key="index" :class="{ active: item.name === active }" v-bind="item.props">
      <slot :name="item.name"></slot>
    </a-position>
  </div>
</template>

<script>
import APosition from '@/components/basic/Position'

import status from '@/mixins/status'
import box from '@/mixins/box'
import position from '@/mixins/position'
import event from '@/mixins/event'

export default {
  components: {
    APosition
  },

  mixins: [status, box, position, event],

  props: {
    defaultActive: {
      type: String,
      default: ''
    },

    items: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    tabStyle() {
      let style = { overflow: 'hidden', ...this.mixins_position_style }

      if (this.active) {
        let { props } = this.items.find(i => i.name === this.active)
        if (props) {
          if (props.height) {
            style.height = props.height
          }
          if (props.width) {
            style.width = props.width
          }
        }
      }

      return style
    },

    cItems() {
      return this.items.map(item => {
        let p = {
          name: item.name,
          props: {
            left: '0',
            right: '0',
            top: '0',
            bottom: '0',
            ...(item.props || {})
          }
        }

        if (
          !item.props.width &&
          !item.props.height &&
          item.name === this.active
        ) {
          p.props.position = 'relative'
        }

        return p
      })
    }
  },

  data() {
    return {
      active: this.defaultActive
    }
  },

  methods: {
    switchName(name = '') {
      this.active = name
    },

    switchIndex(index = -1) {
      this.active = index > -1 ? this.items[index].name : ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.a-tab-item {
  pointer-events: none;
  opacity: 0;
  transform: translateX(100%);

  &.active {
    pointer-events: auto;
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
