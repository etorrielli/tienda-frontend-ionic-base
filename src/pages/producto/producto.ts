import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {CarritoProvider} from "../../providers/carrito/carrito";

@IonicPage()
@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {

  producto:any={};

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public carProvider:CarritoProvider) {
    this.producto = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductoPage');
  }

}
