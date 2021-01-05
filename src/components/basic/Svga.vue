<template>
  <div :style="mPositionStyle" style="display:flex; align-items:center; justify-content:center">
    <canvas style="max-width: 100%; max-height: 100%" :id="id"></canvas>
  </div>
</template>

<script>
import { Downloader, Parser, Player } from 'svga.lite'

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

const downloader = new Downloader()
const parser = new Parser()

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

      player: null,
      svgaData: null
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
            setTimeout(async () => {
              if (!this.player) {
                this.player = new Player(id)
              }

              if (!videos[url]) {
                try {
                  const fileData = await downloader.get(url)
                  videos[url] = await parser.do(fileData)
                } catch (e) {}
              }

              if (this.isDestroyed || !videos[url]) {
                r()
              } else {
                this.svgaData = videos[url]

                try {
                  await this.player.mount(this.svgaData)
                } catch (e) {
                  r()
                  return
                }
                this.autoplay && this.player.start()
                this.$emit('load-success')
                r()
              }
            }, 10)
          })
      )
    }
  }
}
</script>
