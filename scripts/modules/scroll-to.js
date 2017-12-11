import scroll from 'scroll'
import dom from './dom-helpers'

const resolveTarget = (id) =>
  document.documentElement.scrollTop + dom.find(id).getBoundingClientRect().top

const scrollHandler = function(e) {
  e.preventDefault()
  scroll.top(document.documentElement, resolveTarget(this.getAttribute('href')), { duration: 500 })
}

dom.findAll('[data-scroll-to]')
  .forEach(node => {
    node.addEventListener('click', scrollHandler)
  })
