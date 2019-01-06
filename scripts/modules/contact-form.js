import dom from './dom-helpers'

void ((form) => {
  if (!form) return;
  const fileInput = dom.find('[data-attachment]', form)

  dom.findAll('input, textarea', form)
    .forEach(input => {
      input.addEventListener('focus', () => {
        input.dataset.state = 'ok'
      })
    })

  if (fileInput) {
    fileInput.addEventListener('change', () => {
      if (!fileInput.files.length) return;
      dom.find('[data-attachment-name]').innerHTML = fileInput.files[0].name
    })
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const http = new XMLHttpRequest()
    const formData = new FormData()

    let valid = true
    let submitted = false

    let fields = {
      name: dom.find('[name="name"]', form),
      surname: dom.find('[name="surname"]', form),
      email: dom.find('[name="email"]', form),
      message: dom.find('[name="message"]', form)
    }

    Object.values(fields)
      .forEach(field => {
        if (!field.value || !field.value.length) {
          field.dataset.state = 'error'
          valid = false
        } else if (field.name === 'email' && !/.+@.+\..+/.test(field.value)) {
          field.dataset.state = 'error'
          valid = false
        }
      })

    if (submitted || !valid) return;
    submitted = true

    http.open('POST', 'http://udy.io/api/mail/', true)

    form.dataset.state = 'sending'
    formData.append('sitename', 'llb-cpa')
    formData.append('email', fields.email.value)
    formData.append('mailto', 'reception@llbcpa.ca;info@llbcpa.ca;pascal@ateliermade.ca;support@adsumtech.com;')
    formData.append('message', fields.message.value)
    formData.append('subject', 'Nouveau contact')
    formData.append('name', `${fields.name.value} ${fields.surname.value}`)

    if (fileInput && fileInput.files.length) formData.append('attachment', fileInput.files[0])

    http.addEventListener('load', function() {
      if (this.status >= 200 && this.status < 400) {
        form.dataset.state = 'success'
      } else {
        form.dataset.state = 'error'
      }
    })

    http.send(formData)
  })
})(dom.find('[data-contact-form]'))
