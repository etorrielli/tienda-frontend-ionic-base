import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {CarritoProvider} from "../../providers/carrito/carrito";

@IonicPage()
@Component({
  selector: 'page-ordenes-detalle',
  templateUrl: 'ordenes-detalle.html',
})
export class OrdenesDetallePage {

  orden:any = {}

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private carProvider:CarritoProvider ) {

    this.orden = this.navParams.get("orden");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdenesDetallePage');
  }

  borrarOrden( orden_id:string ){

  }

}
