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
import get from 'lodash/get'
import { getConfig } from '../config'

import getPropsValue from '../utils/getPropsValue'
import getFullUnit from '../utils/getFullUnit'
import { createQuickPorps } from '../utils/quickPorps'

window.__BACKGROUND_LOAD_PROMISE = new Map()

export default {
  props: createQuickPorps({
    width: {
      type: [String, Number]
    },
    height: {
      type: [String, Number]
    },
    widthHeight: {
      type: [String, Number]
    },
    font: {
      type: String
    },
    fontSize: {
      type: [String, Number]
    },
    fontColor: {
      type: String
    },
    fontWeight: {
      type: [String, Number]
    },
    backgroundColor: {
      type: [String, Number]
    },
    backgroundImage: {
      type: [String, Number]
    },
    backgroundSize: {
      type: [String, Number]
    },
    lineHeight: {
      type: [String, Number]
    }
  }),

  data() {
    return {
      mBoxBackgroundImage: {
        loadPromiseReject: null,
        src: '',
        width: 0,
        height: 0
      }
    }
  },

  computed: {
    mBoxStyle() {
      let style = { position: 'relative', ...getBoxStyle.call(this), ...getFontStyle.call(this) }

      if (this.mBoxBackgroundImage.src) {
        style.backgroundImage = `url(${this.mBoxBackgroundImage.src})`
        style.backgroundSize = style.backgroundSize || 'cover'
        style.backgroundPosition = 'center'

        if (getConfig('imageSizeAutoLoader')) {
          const { imageTimes, imageSizeUnit } = getConfig()
          const { width, height } = this.mBoxBackgroundImage

          if (!style.width) {
            style.width = (width * imageTimes).toFixed(2) + imageSizeUnit
          }
          if (!style.height) {
            style.height = (height * imageTimes).toFixed(2) + imageSizeUnit
          }
        }
      }

      return style
    }
  },

  watch: {
    backgroundImage() {
      setBackgroundImage(this)
    },
    bgI() {
      setBackgroundImage(this)
    }
  },

  mounted() {
    setBackgroundImage(this)
  }
}

/*
  尽可能减少混入的方法，所以写成工具函数
  getBackgroundImageParams 获取背景图的参数，根据 status 进行处理，返回 name 和 file
  setBackgroundImage 设置背景图的信息
*/
function getBackgroundImageParams(vm, name) {
  const assets = get(vm, `$route.meta.${getConfig('assetsProperty')}`, {})

  return { name, file: assets[name] || name }
}
function setBackgroundImage(vm) {
  if (vm.mBoxBackgroundImage.loadPromiseReject) {
    vm.mBoxBackgroundImage.loadPromiseReject()
    vm.mBoxBackgroundImage.loadPromiseReject = null
  }

  const { file: backgroundImageFile } = getBackgroundImageParams(vm, getPropsValue(vm, 'backgroundImage'))

  let getImagePromise = Promise.resolve({ src: '', width: 0, height: 0 })

  if (backgroundImageFile) {
    if (!__BACKGROUND_LOAD_PROMISE.has(backgroundImageFile)) {
      __BACKGROUND_LOAD_PROMISE.set(
        backgroundImageFile,
        new Promise((resolve) => {
          let image = new Image()
          image.src = backgroundImageFile
          image.onload = () => resolve(image)
        })
      )
    }

    getImagePromise = __BACKGROUND_LOAD_PROMISE.get(backgroundImageFile)
  }

  new Promise((resolve, reject) => {
    vm.mBoxBackgroundImage.loadPromiseReject = reject

    getImagePromise.then(resolve)
  })
    .then((image) => {
      if (vm.mBoxBackgroundImage.src !== image.src) {
        Object.assign(vm.mBoxBackgroundImage, {
          src: image.src,
          width: image.width,
          height: image.height
        })
      }
    })
    .catch(() => {})
}

/**
 * 获取某些样式
 */
function getBoxStyle() {
  const style = getPropsValue(this, ['width', 'height', 'widthHeight', 'backgroundColor', 'backgroundImage', 'backgroundSize'])

  if (typeof style.widthHeight !== 'undefined') {
    const wh = String(style.widthHeight)
    const [w, h = w] = wh.trim().split(' ')
    style.width = w || 0
    style.height = h || 0
    Reflect.deleteProperty(style, 'widthHeight')
  }

  style.width = getFullUnit(style.width)
  style.height = getFullUnit(style.height)

  return style
}
function getFontStyle() {
  const style = getPropsValue(this, ['font', 'fontSize', 'fontColor', 'fontWeight', 'lineHeight'])

  if (typeof style.font !== 'undefined') {
    const [size = style.fontSize, color = style.fontColor, weight = style.fontWeight] = style.font.trim().split(' ')
    style.fontSize = getFullUnit(size)
    style.fontColor = color
    style.fontWeight = weight
    Reflect.deleteProperty(style, 'font')
  }

  if (typeof style.fontSize !== 'undefined') {
    style.fontSize = getFullUnit(style.fontSize)
  }

  if (typeof style.lineHeight !== 'undefined') {
    style.lineHeight = getFullUnit(style.lineHeight)
  }

  if (typeof style.fontColor !== 'undefined') {
    style.color = style.fontColor
    Reflect.deleteProperty(style, 'fontColor')
  }

  return style
}
