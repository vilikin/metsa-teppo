import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the RoutesService provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class RoutesService {

  constructor(public http: Http) {
    if (!localStorage.getItem('routes')) {
      localStorage.setItem('routes', '[]');
    }
  }

  private routesUrl = 'http://localhost:8080/routes';

  saveRoute(route) {
    let routeString = JSON.stringify(route);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.routesUrl, routeString, options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Error saving route'));

   // let routes = JSON.parse(localStorage.getItem('routes'));
    //route.id = Math.ceil(Math.random() * 10000000);
   // routes.push(route);
    //localStorage.setItem('routes', JSON.stringify(routes));
  }

  getRoutes() {
    return this.http.get(this.routesUrl)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Error getting routes'));

    //return JSON.parse(localStorage.getItem('routes'));
  }

 /* getRoute(id) {
    let routes = JSON.parse(localStorage.getItem('routes'));
    routes.forEach((route) => {
      if (route.id === id) {
        return route;
      }
    })
  }

  deleteRoute(id) {
    let routes = JSON.parse(localStorage.getItem('routes'));
    routes.forEach((route, index) => {
      if (route.id === id) {
        routes.splice(index, 1);
        localStorage.setItem('routes', routes);
      }
    })
  }*/
 }
