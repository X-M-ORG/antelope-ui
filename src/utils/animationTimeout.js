// export function setAnimationTimeout(callback, time) {
//   let runTime = 0
//   let runId = 0

//   const process = () => {
//     runId = window.requestAnimationFrame(() => {
//       runTime += 17

//       if (runTime > time) {
//         callback()
//       } else {
//         process()
//       }
//     })
//   }

//   process()

//   return () => runId
// }
// export function clearAnimationTimeout(id) {
//   window.cancelAnimationFrame(typeof id === 'function' ? id() : id)
// }

export const setAnimationTimeout = setTimeout
export const clearAnimationTimeout = clearTimeout
