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

window.__BACKGROUND_IMAGE_MAPS = {}

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
          if (!style.width) {
            style.width = getBackgroundImageParams(this, 'width')
          }
          if (!style.height) {
            style.height = getBackgroundImageParams(this, 'height')
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
  getBackgroundImagePath 获取背景图的路径，根据 status 进行处理
  getBackgroundImageParams 获取背景图的参数，根据 config 的配置进行处理
  setBackgroundImage 设置背景图的信息
*/
function getBackgroundImagePath(vm, name) {
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

  let file

  if (vm.$route && vm.$route.meta && vm.$route.meta.aImagesMap) {
    file = vm.$route.meta.aImagesMap[name]
  }

  return file || name
}
function getBackgroundImageParams(vm, key) {
  return (
    (vm.mixinBoxBackgroundImage[key] * config.imageTimes).toFixed(2) +
    config.imageSizeUnit
  )
}
function setBackgroundImage(vm) {
  if (vm.mixinBoxBackgroundImage.loadPromiseReject) {
    vm.mixinBoxBackgroundImage.loadPromiseReject()
    vm.mixinBoxBackgroundImage.loadPromiseReject = null
  }

  const originImagePath = getPropsValue(vm, 'backgroundImage')

  let getImagePromise = Promise.resolve({ src: '', width: 0, height: 0 })

  if (originImagePath) {
    const historyImage = __BACKGROUND_IMAGE_MAPS[originImagePath]

    getImagePromise = historyImage
      ? Promise.resolve(historyImage)
      : new Promise((resolve, reject) => {
          vm.mixinBoxBackgroundImage.loadPromiseReject = reject

          let image = new Image()
          image.src = getBackgroundImagePath(vm, originImagePath)
          image.onload = () => {
            resolve(image)
          }

          __BACKGROUND_IMAGE_MAPS[originImagePath] = image
        })
  }

  getImagePromise
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
