import { Injectable } from '@angular/core';
import { CanActivate, Router, } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(public usuarioService: UsuarioService, public router: Router) {
  }

  canActivate(): Promise<boolean> | boolean {
    const token = this.usuarioService.token;

    const payload = JSON.parse(atob(token.split('.')[1]));

    const expirado = this.expiroToken(payload.exp);

    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.verificarRenueva(payload.exp);
  }

  verificarRenueva(fecha: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const tokenExp = new Date(fecha * 1000);
      const ahora = new Date();

      ahora.setTime(ahora.getTime() + (4 * 60 * 60 * 1000));

      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this.usuarioService.renuevaToken()
          .subscribe(() => { resolve(true); },
            () => {
              this.router.navigate(['/login']);
              reject(false);
            });
      }

      resolve(true);
    });
  }

  expiroToken(fecha: number) {
    const ahora = new Date().getTime() / 1000;

    if (fecha < ahora) {
      return true;
    }

    return false;
  }
}
