import fetch from './fetch'

const mapNode = document.getElementById('map')

const getScriptTag = key => {
  const tag = document.createElement('script')
  tag.setAttribute('async', '')
  tag.setAttribute('defer', '')
  tag.setAttribute('src', `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`)
  return tag
}

if (mapNode) {
  fetch('/assets/data/map-config.json')
    .then(config => {
      const { key, options, marker: position } = JSON.parse(config)

      const init = {
        map: () => new window.google.maps.Map(mapNode, options),
        marker: map =>
          new window.google.maps.Marker({
            position,
            map,
            icon: '/assets/media/logo/llb-map.png'
          })
      }

      window.initMap = () => {
        init.marker(init.map())
      }

      document.body.appendChild(getScriptTag(key))
    })
    .catch(err => console.log(err))
}
