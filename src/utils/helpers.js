export const activeClass = (selector) => {
  console.log(selector)
  selector.classList.add('active')
  selector.addEventListener('transitionend', () => {
    selector.classList.remove('active')
  })
}