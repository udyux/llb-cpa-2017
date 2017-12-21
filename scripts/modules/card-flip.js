import dom from './dom-helpers'

const getFlipHandler = (node) =>
  () => node.classList.add('card--flip')

const getUnflipHandler = (node) =>
  () => node.classList.remove('card--flip')

const getShortestSide = ([front, back]) =>
  (front.clientHeight < back.clientHeight) ? front : back

dom.findAll('[data-card]')
  .forEach(node => {
    getShortestSide(node.children)
      .style.position = 'absolute'

    dom.findAll('[data-card-flip]', node)
      .forEach(flipNode => {
        flipNode.addEventListener('click', getFlipHandler(node))
      })

    dom.findAll('[data-card-unflip]', node)
      .forEach(unflipNode => {
        unflipNode.addEventListener('click', getUnflipHandler(node))
      })
  })
