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

      Vue.prototype[dialogProperty] = {}

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

function getImagesMap(filesPath) {
  return filesPath.keys().reduce((map, name) => {
    map[name.replace('./', '')] = filesPath(name)
    return map
  }, {})
}
