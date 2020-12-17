export default function setAnimationTimeout(callback, time) {
  let runTime = 0

  const process = () =>
    window.requestAnimationFrame(() => {
      runTime += 17

      if (runTime > time) {
        callback()
      } else {
        process()
      }
    })

  process()
}
