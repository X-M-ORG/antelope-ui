import getImagesMap from './utils/getImagesMap'

import Page from './components/basic/Page'
import Section from './components/basic/Section'
import Position from './components/basic/Position'
import List from './components/basic/List'
import Svga from './components/basic/Svga'
import Fps9 from './components/basic/Fps9'
import Sprite from './components/basic/Sprite'
import Button from './components/basic/Button'
import Popup from './components/basic/Popup'

import Bullet from './components/interact/Bullet'
import Timer from './components/interact/Timer'
import Roulette from './components/interact/Roulette'
import Tab from './components/interact/Tab'
import NumSlider from './components/interact/NumSlider'
import Box from './components/interact/Box'

export {
  Page,
  Section,
  Position,
  List,
  Svga,
  Fps9,
  Sprite,
  Button,
  Popup,
  Bullet,
  Timer,
  Roulette,
  Tab,
  NumSlider,
  Box
}

let installed = false

export default {
  install(Vue, options = {}) {
    if (installed) {
      return
    }

    const components = {
      Page,
      Section,
      Position,
      List,
      Svga,
      Fps9,
      Sprite,
      Button,
      Popup,
      Bullet,
      Timer,
      Roulette,
      Tab,
      NumSlider,
      Box
    }

    const { prefix = 'A' } = options

    Object.keys(components).forEach(key => {
      Vue.component(prefix + key, components[key])
    })

    installed = true
  },

  utils: {
    getImagesMap
  }
}
