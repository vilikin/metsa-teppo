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

  public routes: any;

  constructor(public navCtrl: NavController, public routesService: RoutesService, public locationTracker: LocationTracker) {
    this.routes = [];
    this.getRoutes();

    RoutesService.refreshRoutes.subscribe((event) => this.getRoutes());
  }

  getRoutes() {
    this.routesService.getRoutes().subscribe(data => {
        this.routes = data.routes;
        console.log(this.routes);
      })
  }

  openRoute(id) {
    this.routesService.getRoute(id).subscribe(data => {
      console.log(id);
      console.log(data);
    })
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
}
