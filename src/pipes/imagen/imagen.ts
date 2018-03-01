import { Pipe, PipeTransform } from '@angular/core';
import { URL_IMAGENES } from "../../config/ubicaciones.config";

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    return URL_IMAGENES + value.toLowerCase();
  }
}
