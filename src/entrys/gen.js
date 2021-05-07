import get from 'lodash/get'
import { setConfig } from '../config'

export default function genEntry(components) {
  let installed = false

  return {
    install(Vue, options = {}) {
      if (installed) {
        return
      }

      const { componentPrefix, assetsProperty, dialogProperty } = setConfig(options)

      Object.keys(components).forEach((key) => {
        Vue.component(componentPrefix + key, components[key])
      })

      installDialog(Vue, dialogProperty)
      installSvga(Vue)

      Vue.mixin({
        created() {
          if (this !== get(this, '$route.matched.0.instances.default', null)) {
            return
          }

          const imagesMap = this.$options[assetsProperty] || this[assetsProperty]
          if (imagesMap) {
            this.$route.meta[assetsProperty] = { ...this.$route.meta[assetsProperty], ...getImagesMap(imagesMap) }
          }
        }
      })

      installed = true
    }
  }
}

function installDialog(Vue, p) {
  Vue.prototype[p] = {
    $active: 0,
    $open(name, options) {
      Vue.prototype[p][name] && Vue.prototype[p][name].open(options)
    },
    $close(names = []) {
      if (names.length === 0) {
        names = Object.keys(Vue.prototype[p]).filter((k) => k[0] !== '$')
      } else {
        names = [].concat(names)
      }

      for (let name of names) {
        Vue.prototype[p][name] && Vue.prototype[p][name].close()
      }
    }
  }
}

function installSvga(Vue) {
  Vue.prototype.$svgas = {
    $queue: [],
    run() {
      while (Vue.prototype.$svgas.$queue.length) {
        const fn = Vue.prototype.$svgas.$queue.shift()
        fn()
      }
    }
  }
}

function getImagesMap(filesPath) {
  return filesPath.keys().reduce((map, name) => {
    map[name.replace('./', '')] = filesPath(name)
    return map
  }, {})
}
