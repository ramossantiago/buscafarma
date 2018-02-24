import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage, MapaPage, BuscarPage } from '../pages/index.paginas';

// mapas
import { AgmCoreModule } from '../core/core.module';
import { Geolocation } from '@ionic-native/geolocation';
import { UbicacionesProvider } from '../providers/ubicaciones/ubicaciones';

import { HttpClientModule } from '@angular/common/http';
import { PosicionProvider } from '../providers/posicion/posicion';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapaPage,
    BuscarPage
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC_bd32QA5WkQct4Ah0iwEIzYI4KQqbbOo'
    }),
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapaPage,
    BuscarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UbicacionesProvider,
    PosicionProvider
  ]
})
export class AppModule {}
