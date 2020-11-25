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

  watch: {
    url(newVal) {
      newVal && this.loadSvgaAnimation(newVal)
    }
  },

  mounted() {
    const url = getPropsValue(this, 'url')

    if (url) {
      this.id += ++window[ANTELOPE_SVGA_MAP].id

      this.$nextTick(() => {
        this.loadSvgaAnimation(url)
      })
    }
  },

  destroyed() {
    this.isDestroyed = true
  },

  methods: {
    loadSvgaAnimation(u) {
      const id = '#' + this.id
      const url = u.replace(/^http*.\:\/\//g, '//')

      let { queue, videos } = window[ANTELOPE_SVGA_MAP]

      window[ANTELOPE_SVGA_MAP].queue = queue.then(
        () =>
          new Promise((r) => {
            setTimeout(() => {
              if (!this.player) {
                this.player = new SVGA.Player(id)
              }

              const loadHandler = videos[url]
                ? Promise.resolve(videos[url])
                : new Promise((resolve) => {
                    new SVGA.Parser(id).load(
                      url,
                      (videoItem) => {
                        window[ANTELOPE_SVGA_MAP].videos[url] = videoItem

                        resolve(videoItem)
                      },
                      (error) => {
                        this.$emit('load-error', error)
                        resolve(null)
                      }
                    )
                  })

              loadHandler.then((videoItem) => {
                if (this.isDestroyed || !videoItem) {
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
