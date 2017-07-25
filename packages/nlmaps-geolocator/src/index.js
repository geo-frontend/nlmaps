const geoLocateDefaultOpts = {
  follow: false
}

import emitonoff from 'emitonoff';

const GeoLocator = function (opts) {
  const state = Object.assign({}, geoLocateDefaultOpts, opts);
  let positionWatch = positionCallback.bind(this)

  return {
    start () {
      if (state.follow === true) {
        state.watchID = navigator.geolocation.watchPosition(position => this.emit('position', position))
      } else {
        navigator.geolocation.getCurrentPosition(position => this.emit('position', position))
      }
    },

    stop () {
      state.follow = false;
      if (state.watchID && state.watchID !== null) {
        navigator.geolocation.clearWatch(state.watchID);
        state.watchID = null;
      }
    },
    log (){
        console.log(state)
    }
  };
};

function geoLocator(opts){
  if ('geolocation' in navigator) {
    return emitonoff(GeoLocator(opts))
  } else {
    let error = 'geolocation is not available in your browser.'
    throw error;
  }
}

export default geoLocator;
