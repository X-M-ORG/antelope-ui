<template>
  <div :style="listStyle">
    <div :style="iStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import basicMixins from '../../mixins/basic'

export default {
  mixins: [basicMixins],

  props: {
    direction: {
      type: String,
      default: 'y'
    }
  },

  computed: {
    listStyle() {
      return {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        ...this.m_basicStyle
      }
    },

    iStyle() {
      let d = this.direction
      return {
        height: '100%',
        width: '100%',
        boxSizing: 'content-box',
        [`padding-${d === 'y' ? 'right' : 'bottom'}`]: '0.2rem',
        [`overflow-${d === 'y' ? 'x' : 'y'}`]: 'hidden',
        [`overflow-${d}`]: 'scroll'
      }
    }
  }
}
</script>
