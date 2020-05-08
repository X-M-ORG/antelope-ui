const __TEMPLATE_STORE = '__TEMPLATE_STORE'

window[__TEMPLATE_STORE] = {}

export function getTemplateValues(name) {
  return window[__TEMPLATE_STORE][name] || {}
}

export default function createdTemplate(name, options) {
  window[__TEMPLATE_STORE][name] = { ...options }
}
