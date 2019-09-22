import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AlertController, Platform} from 'ionic-angular';
import 'rxjs/add/operator/map';

import {Storage} from '@ionic/storage';

import {URL_SERVICIOS} from "../../config/url.servicios";

@Injectable()
export class UsuarioProvider {

  token: string;
  usrId: string;

  body = {
    "usr": "",
    "pass": ""
  };

  response: any = {};

  constructor(public http: HttpClient
    , public alertCtrl: AlertController
    , public platform: Platform
    , public storage: Storage) {

    this.cargarStorage();
  }

  ingresar(correo: string, pass: string) {

    let url = URL_SERVICIOS + '/login';

    this.body.usr = correo;
    this.body.pass = pass;

    // var headers = new Headers();
    // let options = new RequestOptions({ headers: headers });

    return this.http.post(url, this.body).map(
      (resp: any) => {
        this.response = resp.data;
        console.log(resp);

        if (this.response.error === '0') {
          this.token = this.response.token;
          this.usrId = this.response.idUsr;

          //guardar en storage
          this.guardarStorage();

        } else {
          this.token = "";
          console.log('this.response.error: ' + this.response.error);
          this.alertCtrl.create({
            title: "Error",
            subTitle: this.response.mensaje,
            buttons: ['OK']
          }).present();
        }
      },
      (err) => {

        console.log('err: ' + err);
      });

  }

  cerrarSesion() {
    this.token = null;
    this.usrId = null;

    //guardar storage
    this.guardarStorage();
  }

  guardarStorage() {
    if (this.platform.is('cordova')) {
      this.storage.set('token', this.token);
      this.storage.set('usrId', this.usrId);

    } else {
      if (this.token) {
        localStorage.setItem('token', this.token);
        localStorage.setItem('usrId', this.usrId);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('usrId');
      }

    }
  }

  cargarStorage() {

    let promesa = new Promise((resolve, reject) => {

      if (this.platform.is('cordova')) {

        this.storage.ready().then(() => {
          this.storage.get('token').then(token => {
            if (token) {
              this.token = token;
            }

          })

          this.storage.get('usrId').then(usrId => {
            if (usrId) {
              this.usrId = usrId;
            }
            resolve();
          })
        })

      } else {
        if (localStorage.getItem('token')) {
          this.token = localStorage.getItem('token');
          this.usrId = localStorage.getItem('usrId');
        }
        resolve();
      }
    });
  }

  logueado(): boolean {
    if (this.token && this.token != "") {
      return true;
    } else {
      return false;
    }
  }

}
