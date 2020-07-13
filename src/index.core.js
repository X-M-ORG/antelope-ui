import config from './config'

import getImagesMap from './tools/getImagesMap'
import createdTemplate from './tools/createdTemplate'

import Section from './components/basic/Section'
import Sections from './components/basic/Sections'
import Position from './components/basic/Position'
import List from './components/basic/List'
import Fps9 from './components/basic/Fps9'
import Sprite from './components/basic/Sprite'
import Button from './components/basic/Button'

import Popup from './components/interact/Popup'
import Bullet from './components/interact/Bullet'
import Timer from './components/interact/Timer'
import Roulette from './components/interact/Roulette'
import Tabs from './components/interact/Tabs'
import NumSlider from './components/interact/NumSlider'
import Box from './components/interact/Box'

export {
  Section,
  Sections,
  Position,
  List,
  Fps9,
  Sprite,
  Button,
  Popup,
  Bullet,
  Timer,
  Roulette,
  Tabs,
  NumSlider,
  Box
}

let installed = false

export default {
  install(Vue, options = {}) {
    if (installed) {
      return
    }

    Object.keys(options).forEach((k) => {
      config[k] = options[k]
    })

    const components = {
      Section,
      Sections,
      Position,
      List,
      Fps9,
      Sprite,
      Button,
      Popup,
      Bullet,
      Timer,
      Roulette,
      Tabs,
      NumSlider,
      Box
    }

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
