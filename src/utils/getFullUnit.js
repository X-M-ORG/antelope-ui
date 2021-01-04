import { getConfig } from '../config'

export default function getFullUnit(num) {
  if (!Number.isNaN(Number(num))) {
    num += getConfig('boxUnit')
  }

  return num
}
