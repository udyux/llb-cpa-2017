import arrayFrom from 'array-from'

const scrollBox = document.scrollingElement || document.documentElement

export default {
  scrollBox,

  find: (query, scope = document) =>
    scope.querySelector(query),

  findAll: (query, scope = document) =>
    arrayFrom(scope.querySelectorAll(query)),

  get scrollTop() {
    return scrollBox.scrollTop
  }
}
