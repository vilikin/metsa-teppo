import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RoutesService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class RoutesService {

  constructor(public http: Http) {
    console.log('Hello RoutesService Provider');
  }

  saveRoute(route) {
    let routes = JSON.parse(localStorage.getItem('routes'));
    route.id = Math.ceil(Math.random() * 10000000);
    routes.push(route);
    localStorage.setItem('routes', JSON.stringify(routes));
    console.log(JSON.parse(localStorage.getItem('routes')));
  }

  getRoutes() {
    return JSON.parse(localStorage.getItem('routes'));
  }

  getRoute(id) {
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
  }
 }
