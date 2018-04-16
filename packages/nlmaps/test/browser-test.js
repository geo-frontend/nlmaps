let map = nlmaps.createMap({target: 'mapdiv'})


nlmaps.clickprovider(map).subscribe(singleClick);

nlmaps.clickprovider(map).subscribe(e => console.log(e))
