import dom from './dom-helpers'

const config = {
  origin: window.location.host.replace(/\//g, ''),
  subject: 'Nouveau contact',
  recipient: 'dev@udy.io'
}

const form = dom.find('[data-contact-form]')

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const http = new XMLHttpRequest()
    let file = dom.find('[data-attachment]', form)
    let formData = new FormData()

    Object.keys(config)
      .forEach(field => formData.append(field, config[field]))

    dom.findAll('[data-field]', form)
      .forEach(field => formData.append(field.dataset.field, field.value))

    if (fileInput) formData.append('attachment', fileInput.files[0])

    xhr.open('POST', '/inc/mailto/mailto.php', true)

    xhr.addEventListener('load', function() {
      console.log(JSON.parse(this.response))
    })

    xhr.send(formData)
  })
}
