export const scrollElement = (
  element: HTMLElement,
  scrollDuration: number,
  scrollX: number,
) => {
  if (element) {
    const start = performance.now()
    const startScroll = element.scrollLeft
    const step = () => {
      const now = performance.now()
      const delta = Math.min((now - start) / scrollDuration, 1) /* 0 al 1 */
      /* logica de animacion */
      if (startScroll > scrollX) {
        const scrollCurrent = startScroll - startScroll * delta
        if (scrollCurrent > scrollX) {
          element.scrollTo(scrollCurrent, 0)
        }
      } else {
        const scrollMoveDistance = startScroll + (scrollX - startScroll) * delta
        element.scrollTo(scrollMoveDistance, 0)
      }
      /* condición para finalizar la animación */
      if (delta < 1) {
        window.requestAnimationFrame(step)
      }
      return
    }
    step()
  }
}
