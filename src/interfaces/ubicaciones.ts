import { Posicion } from './posicion';

export class Ubicaciones {
  posicion: Posicion;
  imagen: string;
  descripcion: string;
  distancia: number;
  animacion: string;

  telefonoContacto?: string;
  direccionFisica?: string;
  atencionSemana?: string;
  atencionSabado?: string;
  atencionDomingo?: string;

  constructor() {
    this.animacion = "none";
  }
}
