import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';

import { LocationTracker } from '../../providers/location-tracker';

import { Geolocation } from 'ionic-native';

import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, GoogleMapsPolyline } from 'ionic-native';

@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})
export class MapPage {

  map: GoogleMap;

  polyLine: GoogleMapsPolyline;

  constructor(public navCtrl: NavController, public platform: Platform, private locationTracker: LocationTracker) {
    platform.ready().then(() => {
      this.loadMap();
    });
  }

  loadMap() {

    Geolocation.getCurrentPosition().then((position) => {
      let location = new GoogleMapsLatLng(position.coords.latitude, position.coords.longitude);

      this.map = new GoogleMap('map', {
        'backgroundColor': 'white',
        'controls': {
          'compass': true,
          'myLocationButton': true,
          'indoorPicker': true,
          'zoom': true
        },
        'gestures': {
          'scroll': true,
          'tilt': true,
          'rotate': true,
          'zoom': true
        },
        'camera': {
          'latLng': location,
          'tilt': 30,
          'zoom': 15,
          'bearing': 50
        }
      });

      this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
        console.log('Map is ready!');

        var mapPoints: GoogleMapsLatLng[] = [];

        this.locationTracker.positions.forEach(pos => {
          mapPoints.push(new GoogleMapsLatLng(pos.lat, pos.lng));
        });

      this.map.addPolyline({
        points: mapPoints,
        'color' : '#006400',
        'width': 10,
        'geodesic': true
      }).then(line => {
        this.polyLine = line;
      });

        setInterval(() => {
          this.refreshMap();
        }, 5000);
      });
    })
  }

  refreshMap() {
    var mapPoints: GoogleMapsLatLng[] = [];

    this.locationTracker.positions.forEach(pos => {
      mapPoints.push(new GoogleMapsLatLng(pos.lat, pos.lng));
    });

    this.polyLine.setPoints(mapPoints);
  }

}
