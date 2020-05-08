import { getTemplateValues } from '@/utils/createdTemplate'

export default function getPropsValue(vm = {}, keys = []) {
  let values = [].concat(keys).reduce(
    (values, key) => {
      if (typeof vm[key] !== 'undefined') {
        values[key] = vm[key]
      }
      return values
    },
    { ...getTemplateValues(vm.template) }
  )

  return typeof keys === 'string' ? values[keys] : values
}
