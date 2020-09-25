import config from '../config'

import getImagesMap from '../tools/getImagesMap'
import createdTemplate from '../tools/createdTemplate'

export default function genEntry(components) {
  let installed = false

  return {
    install(Vue, options = {}) {
      if (installed) {
        return
      }

      Object.keys(options).forEach((k) => {
        config[k] = options[k]
      })

      Object.keys(components).forEach((key) => {
        Vue.component(config.componentPrefix + key, components[key])
      })

      Vue.mixin({
        created() {
          if (!this.$route || !this.$route.matched || !this.$route.matched[0] || !this.aImagesMap) {
            return
          }

          if (this === this.$route.matched[0].instances.default) {
            if (!this.$route.meta) {
              this.$route.meta = {}
            }
            this.$route.meta.aImagesMap = { ...this.$route.meta.aImagesMap, ...getImagesMap(this.aImagesMap) }
          }
        }
      })

      installed = true
    },

    utils: {
      getImagesMap,
      createdTemplate
    }
  }
}
