<template>
  <div :style="mPositionStyle">
    <slot></slot>
  </div>
</template>

<script>
import status from '@/mixins/status'
import box from '@/mixins/box'
import position from '@/mixins/position'
import event from '@/mixins/event'

export default {
  mixins: [status, box, position, event],

  props: {
    position: {
      type: String,
      default: 'absolute'
    }
  }
}
</script>
