import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICE } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): any {
    console.log(img);
    const url = URL_SERVICE + '/images';
    if (!img) {
      return url + '/usuarios/xxx';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (tipo) {
      case 'usuarios':
        return url + '/usuarios/' + img;
      case 'medicos':
        return url + '/medicos/' + img;
      case 'hospitales':
        return url + '/hospitales/' + img;
      default:
        return url + '/usuarios/xxx';
    }
  }

}
