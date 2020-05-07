<template>
  <div :style="mixins_position_style">
    <slot></slot>
  </div>
</template>

<script>
import status from '@/mixins/status'
import box from '@/mixins/box'
import position from '@/mixins/position'
import event from '@/mixins/event'

export default {
  mixins: [status, box, position, event]
}
</script>
