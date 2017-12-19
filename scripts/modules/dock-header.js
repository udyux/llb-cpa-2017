import dom from './dom-helpers'

const header = dom.find('[data-header]')
let scroll, buffer, docked

const update = () => {
  let dock = scroll > 10 && !docked
  let undock = scroll <= 10 && docked

  if (dock || undock) docked = header.classList.toggle('header--docked')
  buffer = false
}

const requestUpdate = () => {
  if (!buffer) requestAnimationFrame(update)
  buffer = true
  scroll = dom.scrollTop
}

window.addEventListener('scroll', requestUpdate)
