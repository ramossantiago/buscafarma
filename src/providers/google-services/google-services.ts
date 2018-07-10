import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Posicion } from "../../interfaces/posicion";
import { URL_GOOGLE_DISTANCE_MATRIX } from "../../config/google.config";

@Injectable()
export class GoogleServicesProvider {

  constructor( public http: HttpClient ) {
  }

  obtenerDistanciaTiempo( origen:Posicion, destino:Posicion, medio: string ) {
    let url = URL_GOOGLE_DISTANCE_MATRIX.replace("{0}", origen.latitud.toString());
    url = url.replace("{1}", origen.longitud.toString());
    url = url.replace("{2}", destino.latitud.toString());
    url = url.replace("{3}", destino.longitud.toString());
    url = url.replace("{4}", medio);

    return this.http.get(url);
  }


}
