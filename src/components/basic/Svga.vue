<template>
  <div :style="mPositionStyle">
    <div :style="svgaStyle" :id="id"></div>
    <slot></slot>
  </div>
</template>

<script>
import SVGA from 'svgaplayerweb'
import get from 'lodash/get'

import status from '../../mixins/status'
import box from '../../mixins/box'
import position from '../../mixins/position'
import event from '../../mixins/event'

import { getConfig } from '../../config'

import getPropsValue from '../../utils/getPropsValue'
import getFullUnit from '../../utils/getFullUnit'

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
    svgawh: {
      type: [String, Number]
    },

    url: {
      type: String,
      default: ''
    },

    autoplay: {
      type: Boolean,
      default: true
    },

    autoload: {
      type: Boolean,
      default: true
    },

    params: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      isDestroyed: false,
      id: 'svga-box',
      player: null
    }
  },

  computed: {
    svgaStyle() {
      let style = { ...this.mBoxStyle, width: '100%', height: '100%' }

      const svgawh = getPropsValue(this, 'svgawh')

      if (typeof svgawh !== 'undefined') {
        const [w, h = w] = String(svgawh).trim().split(' ')
        style = {
          ...style,
          width: getFullUnit(w || 0),
          height: getFullUnit(h || 0),
          position: 'absolute',
          zIndex: 1,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }
      }

      return style
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

      if (this.autoload) {
        this.$nextTick(() => {
          this.loadSvgaAnimation(url)
        })
      } else {
        this.$svgas.$queue.push(() => {
          this.loadSvgaAnimation(url)
        })
      }
    }
  },

  destroyed() {
    this.isDestroyed = true
  },

  methods: {
    loadSvgaAnimation(u) {
      const assets = get(this, `$route.meta.${getConfig('assetsProperty')}`, {})

      const id = '#' + this.id
      const url = assets[u] || u.replace(/^http*.\:\/\//g, '//')
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
                  Object.keys(this.params).forEach((key) => {
                    this.player[key] = this.params[key]
                  })
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