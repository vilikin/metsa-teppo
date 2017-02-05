import {Component, ViewChild} from '@angular/core';

import {NavController, Nav} from 'ionic-angular';

import { MapPage } from '../mappage/map';

import { LocationTracker } from '../../providers/location-tracker';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  constructor(public navCtrl: NavController, public locationTracker: LocationTracker) {

  }

  startRoute() {
    this.navCtrl.push(MapPage);
  }
}
