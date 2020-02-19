<template>
  <div :style="tabStyle">
    <slot name="tab-bar"></slot>

    <a-position
      class="a-tab-item"
      v-for="(item, index) in cItems"
      :key="index"
      :class="{ active: item.name === active }"
      v-bind="item.props"
    >
      <slot :name="item.name"></slot>
    </a-position>
  </div>
</template>

<script>
import APosition from '../basic/Position'

import basicMixins from '../../mixins/basic'

export default {
  components: {
    APosition
  },

  mixins: [basicMixins],

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
      let style = { overflow: 'hidden', ...this.m_basicStyle }

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

        if (!p.props.width && !p.props.height) {
          p.props.mode = 'relative'
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

<style lang="scss" scoped>
.a-tab-item {
  pointer-events: none;
  opacity: 0;

  &.active {
    pointer-events: auto;
    opacity: 1;
  }
}
</style>
