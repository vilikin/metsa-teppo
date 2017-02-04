import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import  { MapPage } from '../pages/mappage/map';

import { LocationTracker } from '../providers/location-tracker';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    MapPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    MapPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationTracker
  ]
})
export class AppModule {}
