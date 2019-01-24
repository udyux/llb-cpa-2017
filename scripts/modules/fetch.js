export default uri => {
  const xhr = new XMLHttpRequest()
  let errorHandler = () => {}

  xhr.open('GET', uri, true)

  return {
    then: cb => {
      xhr.onload = function() {
        const validResponse = this.status < 200 || this.status >= 400
        if (validResponse && errorHandler) errorHandler(this)
        cb(this.response)
      }

      xhr.onerror = errorHandler
      xhr.send()

      return {
        catch: handler => {
          errorHandler = handler
        }
      }
    }
  }
}
