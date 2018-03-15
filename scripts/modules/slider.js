import dom from './dom-helpers'

const IE = /MSIE|rv:11/.test(window.navigator.userAgent)
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

const resetLoop = () => {
  timer.classList.remove('running')
  setTimeout(swapSlides, 125)
}

if (IE) setInterval(resetLoop, 6500)
else timer.addEventListener('transitionend', resetLoop)

setTimeout(() => {
  timer.classList.add('running')
}, 250)
