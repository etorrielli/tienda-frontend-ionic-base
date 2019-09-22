import { Pipe, PipeTransform } from '@angular/core';

import {URL_SERVICIOS} from "../../config/url.servicios";


@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {

  transform(codigo: string) {
    return URL_SERVICIOS + "/img/productos/" + codigo + ".jpg";
  }
}
