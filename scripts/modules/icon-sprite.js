const xhr = new XMLHttpRequest()
const log = (msg) => console.warn('Icon spritesheet could not be loaded\n', msg)

const inject = (sprite) {
  let figure = document.createElement('figure')
  figure.style.display = 'none'
  figure.innerHTML = sprite
  document.body.inserBefore(figure, document.body.children[0])
}

xhr.open('GET', '/assets/media/icons/sprite.svg', true)
xhr.onload = () => (this.status >= 200 && this.status < 400)
  ? inject(this.response)
  : log(this.status)
}

xhr.onerror = log
xhr.send()
