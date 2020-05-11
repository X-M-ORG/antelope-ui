import clone from '@/utils/clone'

const logogramPorps = {
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

export default logogramPorps

export function mergeLogogramPorps(obj) {
  let props = {}
  Object.keys(obj).forEach(key => {
    props[key] = clone(obj[key])

    if (logogramPorps[key]) {
      props[logogramPorps[key]] = clone(obj[key])
    }
  })

  return props
}
