<template>
  <div class="a-sections" :style="mPositionStyle">
    <slot></slot>
  </div>
</template>

<script>
import status from '../../mixins/status'
import box from '../../mixins/box'
import position from '../../mixins/position'
import event from '../../mixins/event'

export default {
  mixins: [status, box, position, event]
}
</script>

<style lang="stylus">
.a-sections
  > *:not(:first-child)
    margin-top -1px
</style>