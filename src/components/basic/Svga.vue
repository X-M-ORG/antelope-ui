<template>
  <div class="a-svga" :style="m_basicStyle" :id="id"></div>
</template>

<script>
import basicMixins from '../../mixins/basic'

import SVGA from 'svgaplayerweb'

export default {
  mixins: [basicMixins],

  props: {
    id: {
      type: String,
      default: ''
    },

    url: {
      type: String,
      default: ''
    }
  },

  mounted() {
    if (this.id && this.url) {
      this.$nextTick(() => {
        this.loadSvgAnimation(`#${this.id}`, this.url)
      })
    }
  },

  methods: {
    loadSvgAnimation(id, url) {
      const player = new SVGA.Player(id)
      const parser = new SVGA.Parser(id)

      parser.load(
        url,
        videoItem => {
          player.setVideoItem(videoItem)
          player.startAnimation()

          this.$emit('load-success')
        },
        error => {
          this.$emit('load-error', error)
        }
      )
    }
  }
}
</script>
