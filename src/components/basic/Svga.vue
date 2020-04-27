<template>
  <div class="a-svga" :style="mixins_position_style" :id="id"></div>
</template>

<script>
import status from '../../mixins/status'
import box from '../../mixins/box'
import position from '../../mixins/position'
import event from '../../mixins/event'

import SVGA from 'svgaplayerweb'

export default {
  mixins: [status, box, position, event],

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
      let _svgaLoad = window._svgaLoad || Promise.resolve()

      window._svgaLoad = _svgaLoad.then(
        () =>
          new Promise(r => {
            setTimeout(() => {
              const player = new SVGA.Player(id)
              const parser = new SVGA.Parser(id)

              if (window.SVGA_URL_MAP && window.SVGA_URL_MAP[url]) {
                let videoItem = window.SVGA_URL_MAP[url]
                player.setVideoItem(videoItem)
                player.startAnimation()
                this.$emit('load-success')
                r()
              } else {
                parser.load(
                  url,
                  videoItem => {
                    if (window.SVGA_URL_MAP) {
                      window.SVGA_URL_MAP[url] = videoItem
                    } else {
                      window.SVGA_URL_MAP = { [url]: videoItem }
                    }

                    player.setVideoItem(videoItem)
                    player.startAnimation()
                    this.$emit('load-success')
                    r()
                  },
                  error => {
                    this.$emit('load-error', error)
                  }
                )
              }
            }, 20)
          })
      )
    }
  }
}
</script>
