export default function getKeysValue(database = {}, keys = []) {
  let values = [].concat(keys).reduce((values, key) => {
    if (typeof database[key] !== 'undefined') {
      values[key] = database[key]
    }
    return values
  }, {})

  return typeof keys === 'string' ? values[keys] : values
}
