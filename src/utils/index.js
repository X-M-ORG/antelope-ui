export function getKeysValue(keys = [], database = {}) {
  return keys.reduce((values, key) => {
    if (database[key]) {
      values[key] = database[key]
    }
    return values
  }, {})
}
