import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {OrdenesDetallePage} from "../index.pages";
import {CarritoProvider} from "../../providers/carrito/carrito";

@IonicPage()
@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {

  ordenesDetalle = OrdenesDetallePage;

  constructor(public navCtrl: NavController
            , public navParams: NavParams
            , public carProvider:CarritoProvider) {
  }

  ionViewWillEnter() {
    console.log("cargando ordenes");
    this.carProvider.cargarOrdenes();
  }

}
