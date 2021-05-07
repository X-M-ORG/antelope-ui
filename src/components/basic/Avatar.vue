<template>
  <a-section style="border-radius: 50%;" v-bind="$attrs" @a-tap="tapAvatar()">
    <component v-if="avatarFrame" :is="aFrameComponent.is" v-bind="aFrameComponent.attrs"></component>

    <slot></slot>
  </a-section>
</template>

<script>
import { getConfig } from '../../config'

import ASection from './Section'

export default {
  components: { ASection },

  props: {
    frame: {
      type: String,
      default: ''
    },
    frameAttrs: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    avatarFrame() {
      return this.frame.replace(/^http*.\:\/\//g, '//')
    },

    aFrameComponent() {
      const path = this.avatarFrame
      const isSvga = path.indexOf('.svga') > -1

      return {
        is: isSvga ? 'a-svga' : 'a-position',
        attrs: {
          pc: '',
          pz: '10',
          w: '135%',
          h: '135%',
          [isSvga ? 'url' : 'bgI']: path,
          ...this.frameAttrs
        }
      }
    }
  },

  methods: {
    tapAvatar() {
      const { avatarOnTap } = getConfig()
      const aTap = this.$listeners['a-tap'] || this.$listeners.aTap

      if (aTap) {
        aTap(this.$attrs, avatarOnTap)
      } else {
        avatarOnTap(this.$attrs)
      }
    }
  }
}
</script>