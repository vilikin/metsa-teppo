import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import  { MapPage } from '../pages/mappage/map';

import { LocationTracker } from '../providers/location-tracker';
import { RoutesService } from "../providers/routes-service";
import {RouteMapPage} from "../pages/route-map-page/routemap";

@NgModule({
  declarations: [
    MyApp,
    Page1,
    MapPage,
    RouteMapPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    MapPage,
    RouteMapPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationTracker,
    RoutesService
  ]
})
export class AppModule {}
