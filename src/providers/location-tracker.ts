import { Injectable, NgZone } from '@angular/core';

import { Geolocation, Geoposition, BackgroundGeolocation } from 'ionic-native';
import 'rxjs/add/operator/filter';
import { RoutesService } from './routes-service';

/*
  Generated class for the LocationTracker provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

export interface Location {
  lat: number;
  lng: number;
}

@Injectable()
export class LocationTracker {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;
  public positions: Location[] = [];
  public routes = [];

  constructor(public zone: NgZone, public routesService: RoutesService) {
    if (!localStorage.getItem('routes')) {
      localStorage.setItem('routes', '[]');
    } else {
      this.routes = JSON.parse(localStorage.getItem('routes'));
    }
  }

  startTracking() {
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: false,
      interval: 15000
    };

    BackgroundGeolocation.configure((location) => {

      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;

        this.positions.push({
          lat: this.lat,
          lng: this.lng
        });
      });
    }, (err) => {
      console.log(err);
    }, config);

    // Turn ON the background-geolocation system.
    BackgroundGeolocation.start();

    // Foreground Tracking

    let options = {
      maximumAge: 15000,
      enableHighAccuracy: true
    };

    if (!this.watch || this.watch.runCount < 0) {
      this.watch = setInterval(() => {
        console.log("minä se olen");
        Geolocation.getCurrentPosition({enableHighAccuracy: true})
          .then(position => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;

            this.positions.push({
              lat: this.lat,
              lng: this.lng
            });
          });
      }, 15000);
    }
  }

  stopTracking() {
    console.log('stopTracking');
    let route = {
      positions: this.positions,
      name: "Hieno metsä"
    };
    this.routesService.saveRoute(route);

    BackgroundGeolocation.stop();
    console.log(this.watch);
    clearInterval(this.watch);
    console.log(this.watch);
    this.positions = [];
  }
}
