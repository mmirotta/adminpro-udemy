import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICE } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    const url = URL_SERVICE + '/img';
    if (!img) {
      return url + '/usuarios/xxx';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (tipo) {
      case 'usuarios':
        
        break;
        case 'usuarios':
        
          break;
          case 'usuarios':
        
            break;
          
    
      default:
        break;
    }

    return null;
  }

}
