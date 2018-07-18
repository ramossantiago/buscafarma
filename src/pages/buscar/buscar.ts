import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PosicionProvider } from "../../providers/posicion/posicion";
import { UbicacionesProvider } from "../../providers/ubicaciones/ubicaciones";
import { LoaderUtilProvider } from "../../providers/utils/loader-util";

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

  radioBusqueda:number = 3500;


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
        let ubicaciones = respuestaJson.ubicaciones;
        console.log(ubicaciones);
        this.loadingCtrl.hideLoader();

        if (ubicaciones.length <= 0) {
          this.mostrarAlertaSimple("Tu búsqueda no tiene resultados, por favor intenta nuevamente cambiando tu búsqueda", "Ubicaciones");
        }


      },
      error => {
        this.loadingCtrl.hideLoader();
        this.mostrarAlertaSimple("No fue posible realizar la búsqueda, por favor intenta mas tarde", "Ubicaciones");
        console.log("No se puede consultar");
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
