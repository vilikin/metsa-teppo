import { Component } from '@angular/core';

import {NavController, Platform, LoadingController } from 'ionic-angular';

import { LocationTracker } from '../../providers/location-tracker';

import { Geolocation } from 'ionic-native';

import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, GoogleMapsPolyline } from 'ionic-native';
import { RoutesService } from "../../providers/routes-service";

import { AlertController } from 'ionic-angular';

@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})
export class MapPage {

  map: GoogleMap;

  polyLine: GoogleMapsPolyline;
  loading: boolean;

  constructor(public navCtrl: NavController, public platform: Platform, private locationTracker: LocationTracker,
              public routesService: RoutesService, public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
    this.loading = true;

    platform.ready().then(() => {
      this.loadMap();
      this.locationTracker.startTracking();
    });
  }

  endRoute() {
    this.navCtrl.pop();
    this.locationTracker.stopTracking();
    let prompt = this.alertCtrl.create({
      title: 'Tallenna reitti',
      inputs: [
        {
          name: 'Reitin nimi',
          placeholder: 'Kirjoita reitille nimi'
        },
      ],
      buttons: [
        {
          text: 'Poista'
        },
        {
          text: 'Tallenna',
          handler: data => {
            this.routesService.saveRoute({
              positions: this.locationTracker.positions,
              name: data
            });
          }
        }
      ]
    });
    prompt.present();
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
        this.loading = false;
        setInterval(() => {
            this.refreshMap();
          }, 2000);
        });
    });
  }

  refreshMap() {
    let mapPoints: GoogleMapsLatLng[] = [];

    this.locationTracker.positions.forEach(pos => {
      mapPoints.push(new GoogleMapsLatLng(pos.lat, pos.lng));
    });

    if (this.polyLine) {
      this.polyLine.setPoints(mapPoints);
    } else if (mapPoints.length > 1) {
      this.map.addPolyline({
        points: mapPoints,
        'color' : '#006400',
        'width': 7,
        'geodesic': true
      }).then(line => {
        console.log("setting polyline");
        this.polyLine = line;
      });
    }
  }



}
