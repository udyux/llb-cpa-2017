import scroll from 'scroll'
import dom from './dom-helpers'

const navHeight = () => dom.find('[data-header]').clientHeight

const resolveTarget = id => dom.scrollTop + dom.find(id).getBoundingClientRect().top - navHeight()

const scrollHandler = function(e) {
  e.preventDefault()
  scroll.top(dom.scrollBox, resolveTarget(this.getAttribute('href')), { duration: 500 })
}

dom.findAll('[data-scroll-to]').forEach(node => {
  node.addEventListener('click', scrollHandler)
})
