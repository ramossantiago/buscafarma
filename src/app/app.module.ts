import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage, MapaPage, BuscarPage, DetalleUbicacionPage } from '../pages/index.paginas';

// mapas
import { AgmCoreModule } from '../core/core.module';
import { Geolocation } from '@ionic-native/geolocation';
import { UbicacionesProvider } from '../providers/ubicaciones/ubicaciones';
import { GoogleServicesProvider } from '../providers/google-services/google-services';

import { HttpClientModule } from '@angular/common/http';
import { PosicionProvider } from '../providers/posicion/posicion';
import { LoaderUtilProvider } from '../providers/utils/loader-util';

// pipes
import { ImagenPipe } from "../pipes/imagen/imagen";
import { ImagenMiniaturaPipe } from "../pipes/imagen-miniatura/imagen-miniatura";

// config
import { GOOGLE_API_KEY } from "../config/google.config";

// native
import { CallNumber } from '@ionic-native/call-number';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapaPage,
    BuscarPage,
    DetalleUbicacionPage,
    ImagenPipe,
    ImagenMiniaturaPipe
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: GOOGLE_API_KEY
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
    BuscarPage,
    DetalleUbicacionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UbicacionesProvider,
    PosicionProvider,
    LoaderUtilProvider,
    GoogleServicesProvider,
    CallNumber
  ]
})
export class AppModule {}
