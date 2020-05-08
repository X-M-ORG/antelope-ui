/*
  混合组件基础样式
  
  属性:
  width 宽
  height 高
  backgroundColor 背景色
  backgroundImage 背景图
  
  依赖的混合:
    status
*/
import config from '@/config'
import getPropsValue from '@/utils/getPropsValue'

let backgroundImageMaps = {}

export default {
  props: {
    template: {
      type: String,
      default: ''
    },
    width: {
      type: String
    },
    height: {
      type: String
    },
    backgroundColor: {
      type: String
    },
    backgroundImage: {
      type: String
    }
  },

  data() {
    return {
      mixins_load_promise_reject: null,
      mixins_box_background_image: {
        src: '',
        width: 0,
        height: 0
      }
    }
  },

  computed: {
    mixins_box_style() {
      let style = {
        position: 'relative',
        ...getPropsValue(this, [
          'width',
          'height',
          'backgroundColor',
          'backgroundImage'
        ])
      }

      if (this.mixins_box_background_image.src) {
        style.backgroundImage = `url(${this.mixins_box_background_image.src})`
        style.backgroundSize = '100% 100%'

        if (config.imageSizeAutoLoader) {
          if (!style.width) {
            style.width = this._getBackgroundImageParams('width')
          }
          if (!style.height) {
            style.height = this._getBackgroundImageParams('height')
          }
        }
      }

      return style
    }
  },

  watch: {
    backgroundImage() {
      this._setBackgroundImage()
    },
    status() {
      this._setBackgroundImage()
    }
  },

  mounted() {
    this._setBackgroundImage()
  },

  methods: {
    _getBackgroundImagePath(name) {
      let suffix = getPropsValue(this, 'status')

      switch (suffix) {
        case 1:
        case true: {
          suffix = ''
          break
        }
        case 0:
        case false: {
          suffix = 'disabled'
          break
        }
      }

      if (suffix) {
        let k = name.split('.')
        k.splice(k.length - 1, 0, suffix)
        name = k.join('.')
      }

      let file

      if (this.$route && this.$route.meta && this.$route.meta.aImagesMap) {
        file = this.$route.meta.aImagesMap[name]
      }

      return file || name
    },
    _getBackgroundImageParams(key) {
      let value = this.mixins_box_background_image[key]
      return value * config.imageTimes + config.imageSizeUnit
    },
    _setBackgroundImage() {
      if (this.mixins_load_promise_reject) {
        this.mixins_load_promise_reject()
        this.mixins_load_promise_reject = null
      }

      let backgroundImage = getPropsValue(this, 'backgroundImage')

      if (backgroundImage) {
        let image = backgroundImageMaps[backgroundImage]

        if (image) {
          this.mixins_box_background_image = {
            src: image.src,
            width: image.width,
            height: image.height
          }
        } else {
          new Promise((resolve, reject) => {
            this.mixins_load_promise_reject = reject

            let image = new Image()
            image.src = this._getBackgroundImagePath(backgroundImage)
            image.onload = () => {
              resolve(image)
            }

            backgroundImageMaps[image.src] = image
          })
            .then(image => {
              this.mixins_box_background_image = {
                src: image.src,
                width: image.width,
                height: image.height
              }
            })
            .catch(() => {})
        }
      } else {
        this.mixins_box_background_image = {
          src: '',
          width: 0,
          height: 0
        }
      }
    }
  }
}
