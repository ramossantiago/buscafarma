import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';


@Injectable()
export class PosicionProvider {

  lat: number;
  lng: number;

  constructor(private geolocation: Geolocation) {
    this.actualizarPosicionActual();
  }

  private actualizarPosicionActual() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;

      // BORRAR
      this.lat = -0.292943;
      this.lng = -78.478852;

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
