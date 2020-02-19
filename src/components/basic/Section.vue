<template>
  <div :style="m_basicStyle">
    <slot></slot>
  </div>
</template>

<script>
import basicMixins from '../../utils/basicMixins'

export default {
  mixins: [basicMixins]
}
</script>
