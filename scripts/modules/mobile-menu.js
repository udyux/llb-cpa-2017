import dom from './dom-helpers'

const header = dom.find('[data-header]')

dom.find('[data-burger]', header)
  .addEventListener('click', () => {
    header.classList.toggle('header--open')
    document.body.classList.toggle('noscroll')
  })

dom.findAll('[data-scroll-to]')
  .forEach(node => {
    node.addEventListener('click', () => {
      header.classList.remove('header--open')
      document.body.classList.remove('noscroll')
    })
  })
