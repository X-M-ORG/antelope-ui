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

      installed = true
    },

    utils: {
      getImagesMap,
      createdTemplate
    }
  }
}
