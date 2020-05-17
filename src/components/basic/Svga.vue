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
    },

    autoplay: {
      type: Boolean,
      default: true
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

              const loadHandler = videos[url]
                ? Promise.resolve(videos[url])
                : new Promise((resolve, reject) => {
                    new SVGA.Parser(id).load(
                      url,
                      videoItem => {
                        window.__SVGA_DATA.videos[url] = videoItem

                        resolve(videoItem)
                      },
                      error => {
                        this.$emit('load-error', error)
                        reject()
                      }
                    )
                  })

              loadHandler.then(videoItem => {
                this.player.setVideoItem(videoItem)
                this.autoplay && this.player.startAnimation()
                this.$emit('load-success')
                r()
              })
            }, 20)
          })
      )
    }
  }
}
</script>
