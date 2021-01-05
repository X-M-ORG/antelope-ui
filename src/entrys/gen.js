import { setConfig } from '../config'

export default function genEntry(components) {
  let installed = false

  return {
    install(Vue, options = {}) {
      if (installed) {
        return
      }

      const { componentPrefix, imagesPropertyName, dialogPropertyName } = setConfig(options)

      Object.keys(components).forEach((key) => {
        Vue.component(componentPrefix + key, components[key])
      })

      Vue.prototype[dialogPropertyName] = {}

      Vue.mixin({
        created() {
          if (!this.$route || !this.$route.matched || !this.$route.matched[0] || !this[imagesPropertyName]) {
            return
          }

          if (this === this.$route.matched[0].instances.default) {
            if (!this.$route.meta) {
              this.$route.meta = {}
            }
            this.$route.meta[imagesPropertyName] = { ...this.$route.meta[imagesPropertyName], ...getImagesMap(this[imagesPropertyName]) }
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
