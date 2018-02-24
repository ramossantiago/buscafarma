import { Component, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// models
import { Ubicaciones } from "../../interfaces/ubicaciones";

// providers
import { UbicacionesProvider } from "../../providers/ubicaciones/ubicaciones";
import { PosicionProvider } from "../../providers/posicion/posicion";




@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  etiqueta: string = "YO";
  circuloBusqueda: boolean = false;
  radioBusqueda:number = 1000;
  animation: string = "BOUNCE";

  constructor( public navCtrl: NavController,
               public navParams: NavParams,
               private posicionProvider: PosicionProvider,
               private ubicacionesProvider: UbicacionesProvider) {
  }

  capturarMovimiento(event: any) {
    this.posicionProvider.lat
    this.posicionProvider.lat = event.coords.lat;
    this.posicionProvider.lng = event.coords.lng;
    this.buscarUbicaciones();
  }

  click(event: EventEmitter<MouseEvent>) {
    console.log("click event");
  }


  limpiarBusqueda() {
    this.ubicacionesProvider.ubicaciones = [];
    this.circuloBusqueda = false;
  }


  buscarUbicaciones() {
    this.limpiarBusqueda();
    this.circuloBusqueda = true;
    this.ubicacionesProvider.obtenerUbicaciones(this.posicionProvider.lat, this.posicionProvider.lng, this.radioBusqueda);
  }

}
