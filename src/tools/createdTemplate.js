import clone from 'lodash/clone'

const ANTELOPE_TEMPLATE_STORE = 'ANTELOPE_TEMPLATE_STORE'

window[ANTELOPE_TEMPLATE_STORE] = {}

export function getTemplateValues(name) {
  return window[ANTELOPE_TEMPLATE_STORE][name] || {}
}

export default function createdTemplate(name, options = {}) {
  if (typeof name === 'string') {
    window[ANTELOPE_TEMPLATE_STORE][name] = clone(options)
  } else if (typeof name === 'object') {
    Object.keys(name).forEach((str) => {
      window[ANTELOPE_TEMPLATE_STORE][str] = name[str]
    })
  }
}
