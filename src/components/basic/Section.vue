<template>
  <div :style="m_basicStyle">
    <slot></slot>
  </div>
</template>

<script>
import basicMixins from '../../mixins/basic'

export default {
  mixins: [basicMixins]
}
</script>
