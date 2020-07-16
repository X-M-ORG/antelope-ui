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
import { createQuickPorps } from '@/utils/quickPorps'

window.__BACKGROUND_LOAD_PROMISE = {}

export default {
  props: createQuickPorps({
    template: {
      type: String
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
      let style = {
        position: 'relative',
        ...getPropsValue(this, [
          'width',
          'height',
          'backgroundColor',
          'backgroundImage'
        ])
      }

      if (this.mBoxBackgroundImage.src) {
        style.backgroundImage = `url(${this.mBoxBackgroundImage.src})`
        style.backgroundSize = '100% 100%'

        if (config.imageSizeAutoLoader) {
          const { imageTimes, imageSizeUnit } = config
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
  let file

  if (vm.$route && vm.$route.meta && vm.$route.meta.aImagesMap) {
    file = vm.$route.meta.aImagesMap[name] || name
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

  const {
    name: backgroundImageName,
    file: backgroundImageFile
  } = getBackgroundImageParams(vm, getPropsValue(vm, 'backgroundImage'))

  let getImagePromise = Promise.resolve({ src: '', width: 0, height: 0 })

  if (backgroundImageFile) {
    if (!__BACKGROUND_LOAD_PROMISE[backgroundImageName]) {
      __BACKGROUND_LOAD_PROMISE[backgroundImageName] = new Promise(
        (resolve) => {
          let image = new Image()
          image.src = backgroundImageFile
          image.onload = () => resolve(image)
        }
      )
    }

    getImagePromise = __BACKGROUND_LOAD_PROMISE[backgroundImageName]
  }

  new Promise((resolve, reject) => {
    vm.mBoxBackgroundImage.loadPromiseReject = reject

    return getImagePromise.then(resolve)
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
