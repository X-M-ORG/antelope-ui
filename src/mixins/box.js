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
    backgroundColor: {
      type: [String, Number]
    },
    backgroundImage: {
      type: [String, Number]
    },
    // todo delete
    imageSuffix: {
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
      const boxProps = getPropsValue(this, ['width', 'height', 'widthHeight', 'backgroundColor', 'backgroundImage'])

      if (typeof boxProps.widthHeight !== 'undefined') {
        const [width, height = width] = String(boxProps.widthHeight)
          .trim()
          .split(' ')
        boxProps.width = width || 0
        boxProps.height = height || 0
        Reflect.deleteProperty(boxProps, 'widthHeight')
      }

      boxProps.width = getFullUnit(boxProps.width)
      boxProps.height = getFullUnit(boxProps.height)

      let style = { position: 'relative', ...boxProps }

      if (this.mBoxBackgroundImage.src) {
        style.backgroundImage = `url(${this.mBoxBackgroundImage.src})`
        style.backgroundSize = '100% 100%'

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
    },
    // todo delete
    imageSuffix() {
      setBackgroundImage(this)
    },
    iS() {
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
  let file

  // todo delete
  const suffix = getPropsValue(vm, 'imageSuffix')
  if (suffix) {
    let k = name.split('.')
    k.splice(k.length - 1, 0, String(suffix))
    name = k.join('.')
  }

  const assetsProperty = getConfig('assetsProperty')

  if (vm.$route && vm.$route.meta && vm.$route.meta[assetsProperty]) {
    file = vm.$route.meta[assetsProperty][name] || name
  } else {
    file = name
  }

  return { name, file }
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
