import { Component, EventEmitter, ViewChild } from '@angular/core';
import {  IonicPage, NavController, NavParams, AlertController, Slides } from 'ionic-angular';

// models
import { Ubicaciones } from "../../interfaces/ubicaciones";

// providers
import { UbicacionesProvider } from "../../providers/ubicaciones/ubicaciones";
import { PosicionProvider } from "../../providers/posicion/posicion";
import { LoaderUtilProvider } from "../../providers/utils/loader-util";

// paginas
import { DetalleUbicacionPage } from "../index.paginas";

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  etiqueta: string = "YO";
  busquedaActivada: boolean = false;
  radioBusqueda:number = 3500;
  animation: string = "BOUNCE";
  ubicaciones: Ubicaciones[] = [];
  @ViewChild(Slides) slides: Slides;


  constructor( public navCtrl: NavController,
               public navParams: NavParams,
               private posicionProvider: PosicionProvider,
               private ubicacionesProvider: UbicacionesProvider,
               private alertCtrl: AlertController,
               private loadingCtrl: LoaderUtilProvider) {

  }


  capturarMovimiento(event: any) {
    this.posicionProvider.deviceLat = event.coords.lat;
    this.posicionProvider.deviceLng = event.coords.lng;
    if (this.busquedaActivada) {
      this.buscarUbicaciones();
    }
  }

  click(event: EventEmitter<MouseEvent>) {
    console.log("click event");
  }

  limpiarBusqueda() {
    this.ubicaciones = [];
    this.busquedaActivada = false;
    this.posicionProvider.centrarMapaEnDispositivo();
  }

  buscarUbicaciones() {
    this.limpiarBusqueda();
    this.loadingCtrl.showLoader("Buscando ...");

    this.ubicacionesProvider.obtenerUbicaciones(this.posicionProvider.deviceLat, this.posicionProvider.deviceLng, this.radioBusqueda).subscribe(
      data => {
        let respuestaJson = JSON.parse(JSON.stringify(data));
        this.ubicaciones = respuestaJson.ubicaciones;

        // ordenar de manera mas cercana a mas lejana
        this.ubicaciones = this.ubicaciones.sort( (ubi1: Ubicaciones, ubi2: Ubicaciones) => {
          return ubi1.distancia - ubi2.distancia;
        });


        this.busquedaActivada = true;
        this.loadingCtrl.hideLoader();

        // cambio el centro del mapa a la primera posicion de la busqueda
        this.posicionProvider.cambiarCentroMapa(this.ubicaciones[0].posicion);
      },

      error => {
        this.loadingCtrl.hideLoader();

        this.alertCtrl.create({
          title: "Ubicaciones",
          subTitle: "No fue posible realizar la busqueda, por favor intenta mas tarde",
          buttons: ['Ok']
        }).present();

      });
  }

  cambiaUbicacion() {
    let slideIndex = this.slides.getActiveIndex();
    let ubicacionActual = this.ubicaciones[slideIndex];

    if ( ubicacionActual) {
      this.posicionProvider.cambiarCentroMapa(ubicacionActual.posicion);
    }
  }

  verDetalleUbicacion(ubicacion: Ubicaciones) {
      this.navCtrl.push(DetalleUbicacionPage, {'ubicacion' : ubicacion});
  }

  localizame(){
    this.posicionProvider.centrarMapaEnDispositivo();
  }


}
