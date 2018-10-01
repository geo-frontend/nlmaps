const geoLocateDefaultOpts = {
  follow: false
}

/* eslint-disable-next-line no-unused-vars */
import emitonoff from 'emitonoff';

function positionHandler(position) {
  this.emit('position', position);

}
function positionErrorHandler(error) {
  this.emit('error', error);

}

const GeoLocator = function (opts) {
  const state = Object.assign({}, geoLocateDefaultOpts, opts);

  return {
    start () {
      state.started = true;
      navigator.geolocation.getCurrentPosition(positionHandler.bind(this), positionErrorHandler.bind(this), {maximumAge: 60000})
      return this;
    },
    stop () {
      state.started = false;
      return this;
    },
    isStarted() {
      return state.started;
    },
    log (){
      // eslint-disable-next-line no-console
      console.log(state);
      return this;
    }
  };
};

function geoLocator(opts){
  let navigator = typeof window !== 'undefined' ? window.navigator || {}: {};
  if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
    let geolocator = emitonoff(GeoLocator(opts));
    geolocator.on('position', function() {
      this.stop();
    });
    return geolocator;
  } else {
    let error = 'geolocation is not available in your browser.'
    throw error;
  }
}

export default geoLocator;
