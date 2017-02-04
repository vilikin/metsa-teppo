import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { LocationTracker } from '../../providers/location-tracker';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  constructor(public navCtrl: NavController, public locationTracker: LocationTracker) {

  }

}
