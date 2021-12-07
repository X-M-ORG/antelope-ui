import clone from 'lodash/clone'

const sectionQuickPorps = {
  width: 'w',
  height: 'h',
  widthHeight: 'wh',
  font: 'f',
  fontSize: 'fs',
  fontColor: 'fc',
  fontWeight: 'fw',
  backgroundColor: 'bgC',
  backgroundImage: 'bgI',
  backgroundSize: 'bgS',
  lineHeight: 'lh'
}

const positionQuickPorps = {
  position: 'p',
  zIndex: 'pz',
  positionSet: 'ps',
  top: 'pt',
  bottom: 'pb',
  left: 'pl',
  right: 'pr',
  center: 'pc'
}

export const quickPorps = {
  ...sectionQuickPorps,
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
