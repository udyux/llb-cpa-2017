import dom from './dom-helpers'

const getFlipHandler = (node) => () => node.classList.add('card--flip')
const getUnflipHandler = (node) => () => node.classList.remove('card--flip')

dom.findAll('[data-card]')
  .forEach(node => {
    dom.findAll('[data-card-flip]', node)
      .forEach(flipNode => {
        flipNode.addEventListener('click', getFlipHandler(node))
      })

    dom.findAll('[data-card-unflip]', node)
      .forEach(unflipNode => {
        unflipNode.addEventListener('click', getUnflipHandler(node))
      })
  })
