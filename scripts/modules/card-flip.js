import dom from './dom-helpers'

const nodes = dom.findAll('[data-card]')

const getFlipHandler = (node) =>
  () => node.classList.add('card--flip')

const getUnflipHandler = (node) =>
  () => node.classList.remove('card--flip')

const sortByHeight = ([front, back]) =>
  (front.clientHeight < back.clientHeight) ? [front, back] : [back, front]

const getResizeBuffer = () => {
  let buffer

  const updateNodes = () => {
    nodes.forEach(node => {
      sortByHeight(node.children).forEach((el, i) => {
        if (!i) el.style.position = 'absolute'
        else el.style.position = 'relative'
      })
    })

    buffer = false
  }

  updateNodes()

  return () => {
    if (!buffer) window.requestAnimationFrame(updateNodes)
    buffer = true
  }
}

nodes.forEach(node => {
  dom.findAll('[data-card-flip]', node)
    .forEach(flipNode => {
      flipNode.addEventListener('click', getFlipHandler(node))
    })

  dom.findAll('[data-card-unflip]', node)
    .forEach(unflipNode => {
      unflipNode.addEventListener('click', getUnflipHandler(node))
    })
})

setTimeout(() => {
  window.addEventListener('resize', getResizeBuffer())
}, 500)
