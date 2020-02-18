<template>
  <div :style="positionStyle">
    <slot></slot>
  </div>
</template>

<script>
import basicMixins from '../../mixins/basic'
import positionMixins from '../../mixins/position'

export default {
  mixins: [basicMixins, positionMixins],

  computed: {
    positionStyle() {
      return {
        ...this.m_basicStyle,
        ...this.m_positionStyle
      }
    }
  }
}
</script>
