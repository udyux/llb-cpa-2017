import fetch from './fetch'

fetch('/assets/icons/sprite.svg')
  .then(sprite => {
    const figure = document.createElement('figure')
    figure.style.display = 'none'
    figure.innerHTML = sprite
    document.body.insertBefore(figure, document.body.children[0])
  })
  .catch(err => {
    console.warn('Icon spritesheet could not be loaded\n', err)
  })
