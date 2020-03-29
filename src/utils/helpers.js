export const activeClass = (selector) => {
  selector.classList.add('active')
  setTimeout(() => {
    selector.classList.remove('active')
  }, 200);
}