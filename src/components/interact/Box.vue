<template>
  <div :style="mixins_position_style">
    <a-section v-bind="contentAttr" @a-tap="togglePopoverVisible">
      <slot name="content"></slot>
    </a-section>

    <a-section v-bind="popoverAttr" v-show="visible">
      <slot name="popover"></slot>
    </a-section>
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
    contentAttr: {
      type: Object,
      default: () => ({})
    },

    popoverAttr: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      visible: false
    }
  },

  mounted() {
    this.$el.addEventListener(
      'touchstart',
      e => this.visible && e.stopPropagation()
    )
  },

  methods: {
    togglePopoverVisible() {
      if (!this.status) {
        return
      }

      if (this.visible) {
        this.visible = false
      } else {
        this.visible = true

        window.addEventListener(
          'touchstart',
          () => {
            this.visible = false
          },
          { once: true }
        )
      }
    }
  }
}
</script>
