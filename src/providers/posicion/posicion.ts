import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from "ionic-angular";
import { Posicion } from "../../interfaces/posicion";

@Injectable()
export class PosicionProvider {

  deviceLat: number;
  deviceLng: number;

  mapCenterLat: number;
  mapCenterLng: number;


  constructor(private geolocation: Geolocation,
              private alertController: AlertController ) {
    this.obtenerPosicionActual();
  }

  obtenerPosicionActual() {
     this.geolocation.getCurrentPosition().then((resp) => {
        this.deviceLat = resp.coords.latitude;
        this.deviceLng = resp.coords.longitude;

        // TODO BORRAR
        //this.deviceLat = -0.292943;
        //this.deviceLng = -78.478852;

        this.mapCenterLat = this.deviceLat;
        this.mapCenterLng = this.deviceLng;

      }).catch((error) => {

        console.log("Error en ubicacion", error);

        // CAMBIAR A POSICION DEFAULT DE USUARIO
        //this.deviceLat = -0.292943;
        //this.deviceLng = -78.478852;

        this.alertController.create({
            title: "Ubicación",
            //subTitle : "No fue posibe ubicar tu dispositivo, pero puedes mover el punto a tu ubicación",
            subTitle : "No fue posibe ubicar tu dispositivo " + error,
            buttons: ['Ok']
        }).present();

     });
  }


  cambiarCentroMapa( posicion: Posicion ) {
    this.mapCenterLat = posicion.latitud;
    this.mapCenterLng = posicion.longitud;
  }

  centrarMapaEnDispositivo() {
    this.mapCenterLat = this.deviceLat;
    this.mapCenterLng = this.deviceLng;

    console.log("Centrar mapa", this.mapCenterLat, this.mapCenterLng);
  }

}
