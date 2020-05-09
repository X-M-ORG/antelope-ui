<template>
  <div class="a-svga" :style="mixinPositionStyle" :id="id"></div>
</template>

<script>
import SVGA from 'svgaplayerweb'

import status from '@/mixins/status'
import box from '@/mixins/box'
import position from '@/mixins/position'
import event from '@/mixins/event'

import getPropsValue from '@/utils/getPropsValue'

export default {
  mixins: [status, box, position, event],

  props: {
    url: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      id: 'svga-box',
      player: null
    }
  },

  mounted() {
    if (!window.__SVGA_DATA) {
      window.__SVGA_DATA = {
        id: 0,
        queue: Promise.resolve(),
        videos: {}
      }
    }

    const url = getPropsValue(this, 'url')

    if (url) {
      this.id += ++window.__SVGA_DATA.id

      this.$nextTick(() => {
        this.loadSvgaAnimation(`#${this.id}`, url)
      })
    }
  },

  methods: {
    loadSvgaAnimation(id, url) {
      let { queue, videos } = window.__SVGA_DATA

      window.__SVGA_DATA.queue = queue.then(
        () =>
          new Promise(r => {
            setTimeout(() => {
              this.player = new SVGA.Player(id)

              if (videos[url]) {
                this.player.setVideoItem(videos[url])
                this.player.startAnimation()
                this.$emit('load-success')
                r()
              } else {
                new SVGA.Parser(id).load(
                  url,
                  videoItem => {
                    window.__SVGA_DATA.videos[url] = videoItem

                    this.player.setVideoItem(videoItem)
                    this.player.startAnimation()
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
