const xhr = new XMLHttpRequest()
const log = (msg) => console.warn('Icon spritesheet could not be loaded\n', msg)

const inject = (sprite) => {
  let figure = document.createElement('figure')
  figure.style.display = 'none'
  figure.innerHTML = sprite
  document.body.insertBefore(figure, document.body.children[0])
}

xhr.open('GET', '/assets/icons/sprite.svg', true)
xhr.onload = function() {
  if (this.status < 200 || this.status >= 400) return log(this.status)
  inject(this.response)
}

xhr.onerror = log
xhr.send()
