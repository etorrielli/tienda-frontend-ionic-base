import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { UsuarioProvider } from "../../providers/usuario/usuario";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  correo: string = "";
  pass: string = "";

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public viewCtrl: ViewController
    , public usrProvider: UsuarioProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ingresarLogin() {

    this.usrProvider.ingresar(this.correo, this.pass)
      .subscribe(() => {

        if (this.usrProvider.logueado()) {
          this.viewCtrl.dismiss(true);
        }
      })

  }

}
