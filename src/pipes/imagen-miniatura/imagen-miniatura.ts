import { Pipe, PipeTransform } from '@angular/core';
import { URL_IMAGENES_MINIATURA } from "../../config/ubicaciones.config";

/**
 * Generated class for the ImagenMiniaturaPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'imagenMiniatura',
})
export class ImagenMiniaturaPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    return URL_IMAGENES_MINIATURA + value.toLowerCase();
  }
}
