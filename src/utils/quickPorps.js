import clone from 'lodash/clone'

const boxQuickPorps = {
  template: 'tpl',
  width: 'w',
  height: 'h',
  backgroundColor: 'bgC',
  backgroundImage: 'bgI'
}

const positionQuickPorps = {
  position: 'p',
  zIndex: 'pz',
  top: 'pt',
  bottom: 'pb',
  left: 'pl',
  right: 'pr',
  center: 'pc'
}

export const quickPorps = {
  ...boxQuickPorps,
  ...positionQuickPorps
}

export function createQuickPorps(props) {
  Object.keys(props).forEach((key) => {
    if (quickPorps[key]) {
      props[quickPorps[key]] = clone(props[key])
    }
  })

  return props
}
