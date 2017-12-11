const find = (query, scope = document) =>
  scope.querySelector(query)

const findAll = (query, scope = document) =>
  [...scope.querySelectorAll(query)]


export default { find, findAll }
