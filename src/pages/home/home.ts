import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {ProductoProvider, CarritoProvider, UsuarioProvider} from "../../providers/index.providers";

import {ProductoPage} from "../index.pages";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  producto:any=ProductoPage;

  constructor(public navCtrl: NavController
            , private proProvider: ProductoProvider
            , private carProvider: CarritoProvider
            , private usrProvider: UsuarioProvider) {

  }



}
