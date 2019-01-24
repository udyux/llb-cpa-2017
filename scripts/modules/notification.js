import dom from './dom-helpers'

dom.find('[data-notification').addEventListener('click', function() {
  this.classList.toggle('-expand')
})
