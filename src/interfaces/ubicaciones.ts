import { Posicion } from './posicion';

export class Ubicaciones {
  posicion: Posicion;
  imagen: string;
  descripcion: string;
  distancia: number;

  telefonoContacto?: string;
  direccionFisica?: string;
  atencionSemana?: string;
  atencionSabado?: string;
  atencionDomingo?: string;
}
