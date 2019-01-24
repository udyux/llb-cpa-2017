import dom from './dom-helpers'

const date = new Date()

dom.findAll('time[data-year]').forEach(node => {
  node.innerHTML += date.getFullYear()
})
