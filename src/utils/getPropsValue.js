import { getTemplateValues } from '@/utils/createdTemplate'

import logogramPorps from '@/utils/logogramPorps'

export default function getPropsValue(vm = {}, keys = []) {
  let values = [].concat(keys).reduce(
    (values, key) => {
      if (typeof vm[key] !== 'undefined') {
        values[key] = vm[key]
      } else if (typeof vm[logogramPorps[key]] !== 'undefined') {
        values[key] = vm[logogramPorps[key]]
      }
      return values
    },
    { ...getTemplateValues(vm.template) }
  )

  return typeof keys === 'string' ? values[keys] : values
}
