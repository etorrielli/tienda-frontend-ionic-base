import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';


import {URL_SERVICIOS} from "../../config/url.servicios";

@Injectable()
export class ProductoProvider {

  response: any = {};
  productos: any[] = [];

  constructor(public http: HttpClient) {
    this.cargarTodos();
  }

  cargarTodos() {
    let url = URL_SERVICIOS + '/productos';

    this.http.get(url).subscribe(
      (resp: any) => {
        this.response = resp;

        if (this.response !== undefined && this.response !== '{}' && this.response.status === 0) {
          this.productos = this.response.data;
          console.log(this.productos);
        } else {
          console.log('mal: ' + this.response.error);
        }
      },
      (err) => {
        console.log('error: ' + err);
      });

  }

}
