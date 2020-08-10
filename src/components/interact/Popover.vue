<template>
  <div :style="mPositionStyle">
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

const isPhone = navigator.userAgent.match(
  /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
)

const TOUCHSTART_EVENT = isPhone ? 'touchstart' : 'mousedown'

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
      TOUCHSTART_EVENT,
      (e) => this.visible && e.stopPropagation()
    )
  },

  methods: {
    togglePopoverVisible() {
      if (this.disabled) {
        return
      }

      if (this.visible) {
        this.visible = false
      } else {
        this.visible = true

        window.addEventListener(
          TOUCHSTART_EVENT,
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
