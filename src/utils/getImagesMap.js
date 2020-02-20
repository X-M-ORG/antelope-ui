export default function getImagesMap(filesPath) {
  return filesPath.keys().reduce((map, name) => {
    map[name.replace('./', '')] = filesPath(name)
    return map
  }, {})
}
