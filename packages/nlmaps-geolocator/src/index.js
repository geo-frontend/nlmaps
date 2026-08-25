import emitonoff from 'emitonoff'

const geoLocateDefaultOpts = {
  follow: false,
}

function positionHandler(position) {
  this.emit('position', position)
}
function positionErrorHandler(error) {
  this.emit('error', error)
}

const GeoLocator = function (opts) {
  const state = Object.assign({}, geoLocateDefaultOpts, opts)

  return {
    start() {
      state.started = true
      navigator.geolocation.getCurrentPosition(
        positionHandler.bind(this),
        positionErrorHandler.bind(this),
        { maximumAge: 60000 },
      )
      return this
    },
    stop() {
      state.started = false
      return this
    },
    isStarted() {
      return state.started
    },
    log() {
      console.log(state)
      return this
    },
  }
}

function geoLocator(opts) {
  const navigator = typeof window !== 'undefined' ? window.navigator || {} : {}
  if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
    const geolocator = emitonoff(GeoLocator(opts))
    geolocator.on('position', function () {
      this.stop()
    })
    return geolocator
  } else {
    const error = 'geolocation is not available in your browser.'
    throw error
  }
}

if (typeof window !== 'undefined') {
  for (const [key, value] of Object.entries({
    geoLocator,
  })) {
    window[key] = value
  }
}

export default geoLocator
