import {Component, ViewChild} from '@angular/core';

import {NavController, Nav} from 'ionic-angular';
import {MapPage} from '../mappage/map';
import {LocationTracker} from '../../providers/location-tracker';
import {RoutesService} from '../../providers/routes-service';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  public distance: number;

  constructor(public navCtrl: NavController, public routesService: RoutesService, public locationTracker: LocationTracker) {

  }

  mapUrl(positions) {

    let url = "https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyBoqzcCl_xiw-lpGEmIPfp09V7wmxp9gTY&size=400x400&path=color:0x006400FF|weight:5";
    positions.forEach(position => {
      url += "|" + position.lat + "," + position.lng;
    });
    return url;
  }

  startRoute() {
    this.navCtrl.push(MapPage);
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

  saveRoute() {

  }
}
