let map = nlmaps.createMap({target: 'mapdiv'})

let talkback;

function myHandler(t, d) {
  if (t === 0) {
    talkback = d;
  } else if (t === 1 ){
  console.log(d);
  }
}

let click = nlmaps.clickprovider(map);
click(0, myHandler)
talkback();

