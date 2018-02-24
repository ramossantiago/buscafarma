import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";

import { URL_SERVICIOS } from "../../config/ubicaciones.config";
import { Ubicaciones } from "../../interfaces/ubicaciones";

import { HttpClient } from '@angular/common/http';

@Injectable()
export class UbicacionesProvider {

  ubicacionesMock: Ubicaciones[] = [
     { posicion: {latitud: -0.292018, longitud: -78.477846}, icono: 'icono', titulo: '1' },
     { posicion: {latitud: -0.285014, longitud: -78.472250}, icono: 'icono', titulo: '2' },
     { posicion: {latitud: -0.308758, longitud: -78.452609}, icono: 'icono', titulo: '3' },
     { posicion: {latitud: -0.312426, longitud: -78.479969}, icono: 'icono', titulo: '4' }
  ];

  ubicaciones: Ubicaciones[] = [];

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

    this.http.post(URL_SERVICIOS, body).subscribe(
      data => {
        let respuestaJson = JSON.parse(JSON.stringify(data));
        this.ubicaciones = respuestaJson.ubicaciones;
      },
      error=> {
        this.ubicaciones = this.ubicacionesMock;
      });

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }




}
