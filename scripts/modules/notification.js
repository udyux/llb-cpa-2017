import dom from './dom-helpers'

const notification = dom.find('[data-notification]')

notification.addEventListener('click', () => notification.classList.toggle('-expand'))
