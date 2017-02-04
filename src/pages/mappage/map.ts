import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';

import { LocationTracker } from '../../providers/location-tracker';

import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';

@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})
export class MapPage {

  map: GoogleMap;

  constructor(public navCtrl: NavController, public platform: Platform, private locationTracker: LocationTracker) {
    platform.ready().then(() => {
      this.loadMap();
    });
  }

  loadMap(){

    let location = new GoogleMapsLatLng(this.locationTracker.lat, this.locationTracker.lng);

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
    });

  }

}
