import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {HomePage, OrdenesPage} from "../index.pages";


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1 = HomePage;
  tab2 = OrdenesPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
