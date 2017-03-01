import {Injectable, EventEmitter} from '@angular/core';
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
  public static refreshRoutes: EventEmitter<string> = new EventEmitter<string>();
  constructor(public http: Http ) {
  }

  private routesUrl = 'http://139.59.132.42/routes';

  saveRoute(route) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    this.http.post(this.routesUrl, route, options)
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(data);
          RoutesService.refreshRoutes.emit("refresh");
        },
        err => {
          console.log(err);
        }
      );
  }

  getRoutes() {
    return this.http.get(this.routesUrl)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Error getting routes'));
  }

  getRoute(id) {
    let route = this.routesUrl + "/" + id;
      return this.http.get(route)
        .map((res: Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || "Error getting route"));
  }


    /*
    let routes = JSON.parse(localStorage.getItem('routes'));
    routes.forEach((route) => {
      if (route.id === id) {
        return route;
      }
    })
  }*/

/*
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
