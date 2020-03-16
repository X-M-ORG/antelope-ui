<template>
  <div :style="m_basicStyle">
    <a-section v-bind="contentAttr" @a-tap="popoverVisible">
      <slot name="content"></slot>
    </a-section>

    <a-section v-bind="popoverAttr" v-show="visible">
      <slot name="popover"></slot>
    </a-section>
  </div>
</template>

<script>
import basicMixins from '../../utils/basicMixins'

export default {
  mixins: [basicMixins],

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
    popoverVisible() {
      if (this.disabled) {
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
