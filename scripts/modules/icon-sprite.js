import fetch from './fetch'

fetch('/assets/icons/sprite.svg')
  .then(sprite => {
    const parser = document.createElement('div')
    parser.innerHTML = sprite
    document.body.insertBefore(parser.firstChild.cloneNode(true), document.body.firstChild)
  })
  .catch(err => {
    console.warn('Icon spritesheet could not be loaded\n', err)
  })
