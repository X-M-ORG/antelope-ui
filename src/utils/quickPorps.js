import clone from '@/utils/clone'

const quickPorps = {
  template: 'tpl',
  width: 'w',
  height: 'h',
  backgroundColor: 'bgC',
  backgroundImage: 'bgI',

  position: 'p',
  zIndex: 'pz',
  top: 'pt',
  bottom: 'pb',
  left: 'pl',
  right: 'pr',
  center: 'pc'
}

export default quickPorps

export function createQuickPorps(obj) {
  let props = {}
  Object.keys(obj).forEach(key => {
    props[key] = clone(obj[key])

    if (quickPorps[key]) {
      props[quickPorps[key]] = clone(obj[key])
    }
  })

  return props
}
