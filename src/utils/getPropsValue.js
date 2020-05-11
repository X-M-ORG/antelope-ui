import { getTemplateValues } from '@/utils/createdTemplate'

import quickPorps from '@/utils/quickPorps'

export default function getPropsValue(vm = {}, keys = []) {
  let values = [].concat(keys).reduce(
    (values, key) => {
      if (typeof vm[key] !== 'undefined') {
        values[key] = vm[key]
      } else if (typeof vm[quickPorps[key]] !== 'undefined') {
        values[key] = vm[quickPorps[key]]
      }
      return values
    },
    { ...getTemplateValues(vm.template) }
  )

  return typeof keys === 'string' ? values[keys] : values
}
