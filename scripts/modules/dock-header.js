import dom from './dom-helpers'

const page = document.documentElement
const header = dom.find('[data-header]')
let scroll, buffer, docked


const update = () => {
  let dock = scroll > 5 && !docked
  let undock = scroll <= 5 && docked

  if (dock || undock) docked = header.classList.toggle('header--docked')
  buffer = false
}

const requestUpdate = () => {
  if (!buffer) requestAnimationFrame(update)
  buffer = true
  scroll = page.scrollTop
}

window.addEventListener('scroll', requestUpdate)
