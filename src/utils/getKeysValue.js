export default function getKeysValue(keys = [], database = {}) {
  return keys.reduce((values, key) => {
    if (typeof database[key] !== 'undefined') {
      values[key] = database[key]
    }
    return values
  }, {})
}
