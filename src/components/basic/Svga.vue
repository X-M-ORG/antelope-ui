<template>
  <div :style="mPositionStyle" :id="id"></div>
</template>

<script>
import SVGA from 'svgaplayerweb'

import status from '../../mixins/status'
import box from '../../mixins/box'
import position from '../../mixins/position'
import event from '../../mixins/event'

import getPropsValue from '../../utils/getPropsValue'

const ANTELOPE_SVGA_MAP = 'ANTELOPE_SVGA_MAP'

if (!window[ANTELOPE_SVGA_MAP]) {
  window[ANTELOPE_SVGA_MAP] = {
    id: 0,
    queue: Promise.resolve(),
    videos: {}
  }
}

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
      isDestroyed: false,
      id: 'svga-box',
      player: null
    }
  },

  mounted() {
    const url = getPropsValue(this, 'url')

    if (url) {
      this.id += ++window[ANTELOPE_SVGA_MAP].id

      this.$nextTick(() => {
        this.loadSvgaAnimation(
          `#${this.id}`,
          url.replace(/^http*.\:\/\//g, '//')
        )
      })
    }
  },

  destroyed() {
    this.isDestroyed = true
  },

  methods: {
    loadSvgaAnimation(id, url) {
      let { queue, videos } = window[ANTELOPE_SVGA_MAP]

      window[ANTELOPE_SVGA_MAP].queue = queue.then(
        () =>
          new Promise((r) => {
            setTimeout(() => {
              this.player = new SVGA.Player(id)

              const loadHandler = videos[url]
                ? Promise.resolve(videos[url])
                : new Promise((resolve, reject) => {
                    new SVGA.Parser(id).load(
                      url,
                      (videoItem) => {
                        window[ANTELOPE_SVGA_MAP].videos[url] = videoItem

                        resolve(videoItem)
                      },
                      (error) => {
                        this.$emit('load-error', error)
                        reject()
                      }
                    )
                  })

              loadHandler.then((videoItem) => {
                if (this.isDestroyed) {
                  r()
                } else {
                  this.player.setVideoItem(videoItem)
                  this.autoplay && this.player.startAnimation()
                  this.$emit('load-success')
                  r()
                }
              })
            }, 10)
          })
      )
    }
  }
}
</script>
