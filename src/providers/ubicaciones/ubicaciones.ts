import { Injectable } from '@angular/core';

import { URL_SERVICIOS } from "../../config/ubicaciones.config";
import { Ubicaciones } from "../../interfaces/ubicaciones";

import { HttpClient } from '@angular/common/http';

@Injectable()
export class UbicacionesProvider {

  /*
  ubicacionesMock: Ubicaciones[] = [
     { posicion: {latitud: -0.292018, longitud: -78.477846}, imagen: 'imagen', descripcion: '1', distancia: 980 },
     { posicion: {latitud: -0.285014, longitud: -78.472250}, imagen: 'imagen', descripcion: '2', distancia: 710 },
     { posicion: {latitud: -0.308758, longitud: -78.452609}, imagen: 'imagen', descripcion: '3', distancia: 550 },
     { posicion: {latitud: -0.312426, longitud: -78.479969}, imagen: 'imagen', descripcion: '4', distancia: 1200 }
  ];
*/

  //ubicaciones: any;

  constructor(private http: HttpClient) {
  }


  obtenerUbicaciones(latitud: any, longitud: any, distanciaBusqueda: any) {

    // let options = new RequestOptions({
    //    headers: new Headers({
    //      'Accept': 'application/json',
    //      'Accept-Language': 'en-US'
    //    })
    // });

    const body = {
                  'posicionActual': {
                    'latitud': latitud,
                    'longitud': longitud
                  },
                  'distancia': distanciaBusqueda
    };

    return this.http.post(URL_SERVICIOS, body);

  }

}
