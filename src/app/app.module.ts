import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {IonicStorageModule} from '@ionic/storage';

import {MyApp} from './app.component';

import {HttpClientModule} from '@angular/common/http';

import {
  CarritoPage,
  CategoriasPage,
  LoginPage,
  OrdenesPage,
  OrdenesDetallePage,
  PorCategoriaPage,
  ProductoPage,
  TabsPage,
  HomePage
} from '../pages/index.pages';

import {CarritoProvider} from '../providers/carrito/carrito';
import {ProductoProvider} from '../providers/producto/producto';
import {UsuarioProvider} from '../providers/usuario/usuario';

//Pipes
import {ImagenPipe} from '../pipes/imagen/imagen';

@NgModule({
  declarations: [
    MyApp,
    ImagenPipe,
    CarritoPage,
    CategoriasPage,
    LoginPage,
    OrdenesPage,
    OrdenesDetallePage,
    PorCategoriaPage,
    ProductoPage,
    TabsPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CarritoPage,
    CategoriasPage,
    LoginPage,
    OrdenesPage,
    OrdenesDetallePage,
    PorCategoriaPage,
    ProductoPage,
    TabsPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarritoProvider,
    ProductoProvider,
    UsuarioProvider
  ]
})
export class AppModule {
}
