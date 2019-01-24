const scrollBox = document.scrollingElement || document.documentElement

export default {
  scrollBox,

  find: (query, scope = document) => scope.querySelector(query),

  findAll: (query, scope = document) => Array.from(scope.querySelectorAll(query)),

  get scrollTop() {
    return scrollBox.scrollTop
  }
}
