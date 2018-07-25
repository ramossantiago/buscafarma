import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PosicionProvider } from "../../providers/posicion/posicion";
import { UbicacionesProvider } from "../../providers/ubicaciones/ubicaciones";
import { LoaderUtilProvider } from "../../providers/utils/loader-util";
import { MapaPage  } from "../index.paginas";

// models
import { Ubicaciones } from "../../interfaces/ubicaciones";

/**
 * Generated class for the BuscarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buscar',
  templateUrl: 'buscar.html',
})
export class BuscarPage {

  radioBusqueda:number = 1000;
  rangoBusqueda: boolean = true;
  ubicaciones: Ubicaciones[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private posicionProvider: PosicionProvider,
              private ubicacionesProvider: UbicacionesProvider,
              private alertCtrl: AlertController,
              private loadingCtrl: LoaderUtilProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscarPage');
  }


  buscarUbicaciones() {
    this.loadingCtrl.showLoader("Buscando ...");
    this.ubicacionesProvider.obtenerUbicaciones(this.posicionProvider.deviceLat, this.posicionProvider.deviceLng, this.radioBusqueda).subscribe(
      data => {
        let respuestaJson = JSON.parse(JSON.stringify(data));
        this.ubicaciones = respuestaJson.ubicaciones;
        this.loadingCtrl.hideLoader();

        // ordenar de manera mas cercana a mas lejana
        this.ubicaciones = this.ubicaciones.sort( (ubi1: Ubicaciones, ubi2: Ubicaciones) => {
          return ubi1.distancia - ubi2.distancia;
        });

        if (this.ubicaciones.length <= 0) {
          this.mostrarAlertaSimple("Tu búsqueda no tiene resultados, por favor intenta nuevamente cambiando tu búsqueda", "Ubicaciones");
        } else {

          if (this.ubicaciones.length > 0) {
            this.ubicaciones[0].animacion = "BOUNCE";
            this.posicionProvider.cambiarCentroMapa(this.ubicaciones[0].posicion);
          }

          this.navCtrl.push(MapaPage, {'ubicaciones' : this.ubicaciones,
                                       'rangoBusqueda' : this.rangoBusqueda,
                                       'radioBusqueda' : this.radioBusqueda });
        }
      },
      error => {
        this.loadingCtrl.hideLoader();
        this.mostrarAlertaSimple("No fue posible realizar la búsqueda, por favor intenta mas tarde", "Ubicaciones");
      });

  }

  private mostrarAlertaSimple(mensaje: string, titulo: string){
    this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['Ok']
    }).present();

  }


}
