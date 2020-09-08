import clone from 'lodash/clone'

import { getTemplateValues } from '../tools/createdTemplate'
import { quickPorps } from './quickPorps'

export default function getPropsValue(vm = {}, keys = []) {
  const templateName = vm.template || vm[quickPorps.template]
  const templateStore = templateName ? clone(getTemplateValues(templateName)) : {}

  const values = [].concat(keys).reduce((values, key) => {
    const quickKey = quickPorps[key] || ''

    if (typeof vm[quickKey] !== 'undefined') {
      values[key] = vm[quickKey]
    } else if (typeof vm[key] !== 'undefined') {
      values[key] = vm[key]
    }

    if (typeof values[key] === 'undefined') {
      if (typeof templateStore[key] !== 'undefined') {
        values[key] = templateStore[key]
      } else if (typeof templateStore[quickKey] !== 'undefined') {
        values[key] = templateStore[quickKey]
      }
    }

    return values
  }, {})

  return typeof keys === 'string' ? values[keys] : values
}
