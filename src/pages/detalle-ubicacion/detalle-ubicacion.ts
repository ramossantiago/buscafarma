import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Ubicaciones } from "../../interfaces/ubicaciones";
import { GoogleServicesProvider } from "../../providers/google-services/google-services"
import { Posicion } from '../../interfaces/posicion';
import { PosicionProvider } from "../../providers/posicion/posicion";
import { ModoViaje } from "../../enums/modo.viaje.enum";

import { CallNumber } from '@ionic-native/call-number';

@IonicPage()
@Component({
  selector: 'page-detalle-ubicacion',
  templateUrl: 'detalle-ubicacion.html',
})
export class DetalleUbicacionPage {

  ubicacion: Ubicaciones;

  tiempoConduciendo: string;
  tiempoCaminando: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private googleProvider: GoogleServicesProvider,
              private posicionProvider: PosicionProvider,
              private callNumber: CallNumber ) {

    this.ubicacion = this.navParams.get("ubicacion");
    this.obtenerTiempoViajeConduciendo();
    this.obtenerTiempoViajeCaminando()
  }


  private obtenerTiempoViajeConduciendo() {
    let observable = this.obtenerTiempoDeViaje(ModoViaje.conduciendo);

    observable.subscribe(
      (data: any) => {
        this.tiempoConduciendo = data.rows[0].elements[0].duration.text;
      });
  }


  private obtenerTiempoViajeCaminando() {
    let observable = this.obtenerTiempoDeViaje(ModoViaje.caminando);

    observable.subscribe(
      (data: any) => {
        this.tiempoCaminando = data.rows[0].elements[0].duration.text;
      });
  }


  private obtenerTiempoDeViaje(modoViaje: string){
    let origen: Posicion = new Posicion();
    origen.latitud = this.posicionProvider.deviceLat;
    origen.longitud = this.posicionProvider.deviceLng;

    return this.googleProvider.obtenerDistanciaTiempo(origen, this.ubicacion.posicion, modoViaje);
  }


  realizarLlamada() {

    this.callNumber.callNumber(this.ubicacion.telefonoContacto, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));

  }

}
