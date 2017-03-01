import { Component } from '@angular/core';
import {NavController, Platform, LoadingController, NavParams} from 'ionic-angular';
import { LocationTracker } from '../../providers/location-tracker';
import { Geolocation } from 'ionic-native';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, GoogleMapsPolyline } from 'ionic-native';
import { RoutesService } from "../../providers/routes-service";
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'route-map-page',
  templateUrl: 'routemap.html'
})
export class RouteMapPage {

  map: GoogleMap;

  polyLine: GoogleMapsPolyline;
  loading: boolean;
  backButton: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public platform: Platform,
              public routesService: RoutesService, public alertCtrl: AlertController,
              public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    this.loading = true;

    this.backButton = platform.registerBackButtonAction(() => {
      console.log("Back");
    }, 100);

    platform.ready().then(() => {
      this.loadMap();
    });
  }

  endRoute() {
    this.backButton();
    this.navCtrl.pop();
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
        this.drawPath();
        });
    });
  }

  drawPath() {
    this.map.clear();
    let mapPoints: GoogleMapsLatLng[] = [];

    this.navParams.get('route')[0].positions.forEach(pos => {
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
