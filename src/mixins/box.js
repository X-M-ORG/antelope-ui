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
import { mergeLogogramPorps } from '@/utils/logogramPorps'

window.__BACKGROUND_LOAD_PROMISE = {}

export default {
  props: mergeLogogramPorps({
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
  }),

  data() {
    return {
      mixinBoxBackgroundImage: {
        loadPromiseReject: null,
        src: '',
        width: 0,
        height: 0
      }
    }
  },

  computed: {
    mixinBoxStyle() {
      let style = {
        position: 'relative',
        ...getPropsValue(this, [
          'width',
          'height',
          'backgroundColor',
          'backgroundImage'
        ])
      }

      if (this.mixinBoxBackgroundImage.src) {
        style.backgroundImage = `url(${this.mixinBoxBackgroundImage.src})`
        style.backgroundSize = '100% 100%'

        if (config.imageSizeAutoLoader) {
          const { imageTimes, imageSizeUnit } = config
          const { width, height } = this.mixinBoxBackgroundImage

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
    status() {
      setBackgroundImage(this)
    }
  },

  mounted() {
    setBackgroundImage(this)
  }
}

/*
  尽可能减少混合的方法，所以写成工具函数
  getBackgroundImageParams 获取背景图的参数，根据 status 进行处理，返回 name 和 path
  setBackgroundImage 设置背景图的信息
*/
function getBackgroundImageParams(vm, name) {
  let suffix = getPropsValue(vm, 'status')

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

  let path

  if (vm.$route && vm.$route.meta && vm.$route.meta.aImagesMap) {
    path = vm.$route.meta.aImagesMap[name]
  }

  return { name, path }
}
function setBackgroundImage(vm) {
  if (vm.mixinBoxBackgroundImage.loadPromiseReject) {
    vm.mixinBoxBackgroundImage.loadPromiseReject()
    vm.mixinBoxBackgroundImage.loadPromiseReject = null
  }

  const {
    name: backgroundImageName,
    path: backgroundImagePath
  } = getBackgroundImageParams(vm, getPropsValue(vm, 'backgroundImage'))

  let getImagePromise = Promise.resolve({ src: '', width: 0, height: 0 })

  if (backgroundImagePath) {
    if (!__BACKGROUND_LOAD_PROMISE[backgroundImageName]) {
      __BACKGROUND_LOAD_PROMISE[backgroundImageName] = new Promise(resolve => {
        let image = new Image()
        image.src = backgroundImagePath
        image.onload = () => resolve(image)
      })
    }

    getImagePromise = __BACKGROUND_LOAD_PROMISE[backgroundImageName]
  }

  new Promise((resolve, reject) => {
    vm.mixinBoxBackgroundImage.loadPromiseReject = reject

    return getImagePromise.then(resolve)
  })
    .then(image => {
      if (vm.mixinBoxBackgroundImage.src !== image.src) {
        Object.assign(vm.mixinBoxBackgroundImage, {
          src: image.src,
          width: image.width,
          height: image.height
        })
      }
    })
    .catch(() => {})
}
