export const scrollTop = (scrollDuration: number) => {
  if (window) {
    const cosParameter = window.scrollY / 2
    let scrollCount = 0
    let oldTimestamp = performance.now()

    const step = (newTimestamp: number) => {
      scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp))
      if (scrollCount >= Math.PI) window.scrollTo(0, 0)
      if (window.scrollY === 0) return
      window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)))
      oldTimestamp = newTimestamp
      window.requestAnimationFrame(step)
    }
    window.requestAnimationFrame(step)
  }
}
