import { quickPorps } from './quickPorps'

export default function getPropsValue(vm = {}, keys = []) {
  const values = [].concat(keys).reduce((values, key) => {
    const quickKey = quickPorps[key] || ''

    if (typeof vm[quickKey] !== 'undefined') {
      values[key] = vm[quickKey]
    } else if (typeof vm[key] !== 'undefined') {
      values[key] = vm[key]
    }

    return values
  }, {})

  return typeof keys === 'string' ? values[keys] : values
}
