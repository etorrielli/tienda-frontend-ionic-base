import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ModalController, AlertController, Platform} from 'ionic-angular';

import {UsuarioProvider} from "../usuario/usuario";

import {LoginPage, CarritoPage} from "../../pages/index.pages";

import {Storage} from '@ionic/storage';

import {URL_SERVICIOS} from "../../config/url.servicios";

@Injectable()
export class CarritoProvider {

  items: any[] = [];
  totalCarro: number = 0;

  body = {
    "token": "",
    "idUsr": "",
    "lstOrdenesDetalle": []
  };

  ordenes: any[] = [];


  response: any = {};

  constructor(public http: HttpClient
    , public usrProvider: UsuarioProvider
    , public modalCtrl: ModalController
    , public alertCtrl: AlertController
    , public platform: Platform
    , public storage: Storage) {

    this.cargarStorageCarro();
    this.actualizarTotal();
  }

  agregarCarrito(pItem: any) {


    for (let item of this.items) {
      if (item.codigo == pItem.codigo) {
        this.alertCtrl.create({
          title: "Item Existe",
          subTitle: pItem.producto + ", ya se encuetra en su carrito",
          buttons: ['OK']
        }).present();

        return;
      }
    }

    this.items.push(pItem);
    this.actualizarTotal();
    this.guardarStorage();
  }

  verCarrito() {

    let modal: any;

    if (this.usrProvider.token) {
      //ir a pag carrito
      modal = this.modalCtrl.create(CarritoPage);
    } else {
      //mostrar login
      modal = this.modalCtrl.create(LoginPage);
    }

    modal.present();
    modal.onDidDismiss((abrirCarrito: boolean) => {

      if (abrirCarrito) {
        modal = this.modalCtrl.create(CarritoPage);
        modal.present();
      }

    })
  }

  private guardarStorage() {
    if (this.platform.is('cordova')) {
      this.storage.set('items', this.items);


    } else {
      localStorage.setItem('items', JSON.stringify(this.items));

    }
  }

  private cargarStorageCarro() {

    let promesa = new Promise((resolve, reject) => {

      if (this.platform.is('cordova')) {

        this.storage.ready().then(() => {
          this.storage.get('items').then(items => {
            if (items) {
              this.items = items;
            }
            resolve();
          })


        })

      } else {
        if (localStorage.getItem('items')) {
          this.items = JSON.parse(localStorage.getItem('items'));

        }
        resolve();
      }
    });

    //return promesa;
  }

  actualizarTotal() {
    this.totalCarro = 0
    for (let item of this.items) {
      this.totalCarro += Number(item.precioCompra);
    }
  }

  eliminarItem(index: number) {
    this.items.splice(index, 1);
  }

  realizarPedido() {

    let url = URL_SERVICIOS + '/ordenes';

    this.body.token = this.usrProvider.token;
    this.body.idUsr = this.usrProvider.usrId;

    for (let item of this.items) {
      let itemDetalleOrden = {"productoId": ""};
      itemDetalleOrden.productoId = item.codigo;
      this.body.lstOrdenesDetalle.push(itemDetalleOrden);
    }

    return this.http.post(url, this.body).subscribe(
      (data: any) => {
        this.response = data;
        console.log(data);

        if (this.response.status === 0) {

          //todo ok
          this.items = [];
          this.guardarStorage();

          this.alertCtrl.create({
            title: "Orden realizada",
            subTitle: "Nos contactaremos con ud. proximamente.",
            buttons: ['OK']
          }).present();

        } else {
          console.log('this.response.error: ' + this.response.message);
          this.alertCtrl.create({
            title: "Error",
            subTitle: this.response.message,
            buttons: ['OK']
          }).present();
        }
      },
      (err) => {

        console.log('err: ' + err);
      });

  }

  cargarOrdenes() {

    if (this.usrProvider.logueado()) {

      let url = URL_SERVICIOS + '/ordenes/' + this.usrProvider.token + '/' + this.usrProvider.usrId;

      this.http.get(url).subscribe(
        (data: any) => {
          this.response = data;

          if (this.response != undefined && this.response != '{}' && this.response.status === 0) {
            this.ordenes = this.response.data.lstOrdenesCompletasDTO;

          } else {
            console.log('mal: ' + this.response.message);
          }
        },
        (err) => {
          console.log('error: ' + err);
        });
    } else {
      this.ordenes = null;

      this.alertCtrl.create({
        title: "No Autenticado",
        subTitle: "Para consultar las ordenes por favor loguearse.",
        buttons: ['OK']
      }).present();
    }

  }

}
