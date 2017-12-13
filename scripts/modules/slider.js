import dom from './dom-helpers'

const timer = dom.find('[data-timer]')
let index = 0

const slides = dom.findAll('[data-slide]')
  .map((node, i) => {
    if (!i) node.classList.add('active-slide')
    else node.classList.remove('active-slide')
    return node
  })

const swapSlides = () => {
  slides[index].classList.remove('active-slide')
  index = (index + 1 === slides.length) ? 0 : index + 1
  slides[index].classList.add('active-slide')
  timer.classList.add('running')
}

timer.addEventListener('transitionend', () => {
  timer.classList.remove('running')
  setTimeout(swapSlides, 125)
})

setTimeout(() => {
  timer.classList.add('running')
}, 250)
