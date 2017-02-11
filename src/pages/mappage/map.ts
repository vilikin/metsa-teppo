import { Component } from '@angular/core';
import { NavController, Platform, LoadingController } from 'ionic-angular';
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
          name: 'Nimi',
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
            console.log(data);
            this.routesService.saveRoute({
              positions: this.locationTracker.positions,
              name: data.Nimi,
              length: this.routeLength(this.locationTracker.positions)
            });
          }
        }
      ]
    });
    prompt.present();
  }

  routeLength(positions) {
    let distance = 0;
    let radius = 6371; // earth's radius
    positions.forEach((position, index) => {
      if (index + 1 < positions.length) {
        let dlat = this.degreeToRadius(position.lat - positions[index + 1].lat);
        let dlng = this.degreeToRadius(position.lng - positions[index + 1].lng);
        let a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
          Math.cos(this.degreeToRadius(position.lat)) *
          Math.cos(this.degreeToRadius(positions[index + 1].lat)) *
          Math.sin(dlng / 2) * Math.sin(dlng / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = radius * c; // Distance in km
        distance += d;
        console.log(d);
      }
    });

    return distance;
  }

  degreeToRadius(degree) {
    return degree * (Math.PI / 180);
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
