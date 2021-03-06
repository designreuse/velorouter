var geocoder = L.Control.Geocoder.nominatim();
var graphhopper = L.Routing.graphHopper('7332d40a-d369-4462-9663-e30f61853b52', {
    serviceUrl: 'https://gabriel.landais.org/gh2',
    urlParameters: {
        vehicle: 'racingbike2',
		locale: 'fr'
    }
});
var lineOptions = {
    styles: [{
        color: 'black',
        opacity: 0.15,
        weight: 9
    }, {
        color: 'white',
        opacity: 0.35,
        weight: 8
    }, {
        color: 'red',
        opacity: 0.35,
        weight: 6
    }]
};

var routingControl = L.Routing.control({
    reverseWaypoints: true,
    geocoder: geocoder,
    router: graphhopper,
    lineOptions: lineOptions,
	position: 'topleft',
	language: 'fr',
	collapsible: true
});

/*
var buttonMode = L.easyButton({
  states:[
    {
      stateName: 'racingbike',
      icon: 'fa-rocket',
      title: 'Vélo de course',
      onClick: function(control){
        control.state("bike");
		graphhopper.options.urlParameters.vehicle = "bike2";
		routingControl.route();
      }
    }, {
      stateName: 'bike',
      icon: 'fa-bicycle',
      title: 'Vélo',
      onClick: function(control){
        control.state("racingbike");
		graphhopper.options.urlParameters.vehicle = "racingbike";
		routingControl.route();
      }
    }
  ]
});
buttonMode.addTo(map);
*/
routingControl.addTo(map);

function button(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

map.on('contextmenu', function(e) {
    var container = L.DomUtil.create('div'),
        startBtn = button('Début', container),
        destBtn = button('Fin', container);

    L.DomEvent.on(startBtn, 'click', function() {
        routingControl.spliceWaypoints(0, 1, e.latlng);
        map.closePopup();
    });

    L.DomEvent.on(destBtn, 'click', function() {
        routingControl.spliceWaypoints(routingControl.getWaypoints().length - 1, 1, e.latlng);
        map.closePopup();
    });

    L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);
});
