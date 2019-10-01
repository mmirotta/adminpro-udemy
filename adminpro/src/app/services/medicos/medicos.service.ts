import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICE } from '../../config/config';
import { tap } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {
  private url: string = URL_SERVICE;
  public totalRegistro: number = 0;

  constructor(public http: HttpClient, public usuarioService: UsuarioService) { }

  cargarMedicos() {
    return this.http.get(this.url + '/medico').pipe(
      tap((resp: any) => {
        this.totalRegistro = resp.total;
        return resp.medicos;
      })
    );
  }

  cargarMedico(id: string) {
    return this.http.get(this.url + '/medico/' + id).pipe(
      tap((resp: any) => {
        return resp.medico;
      })
    );
  }

  buscarMedico(termino: string) {
    return this.http
      .get(this.url + '/busqueda/coleccion/medicos/' + termino)
      .pipe(
        tap((resp: any) => {
          return resp.medicos;
        })
      );
  }

  borrarMedico(id: string) {
    return this.http
      .delete(
        this.url + '/medico/' + id + '?token=' + this.usuarioService.token
      )
      .pipe(
        tap((resp: any) => {
          return resp;
        })
      );
  }

  guardarMedico(medico: Medico) {
    if (medico._id) {
      return this.http
        .put(this.url + '/medico/' + medico._id + '?token=' + this.usuarioService.token, medico)
        .pipe(
          tap((resp: any) => {
            return resp;
          })
        );
    } else {
      return this.http
        .post(this.url + '/medico?token=' + this.usuarioService.token, medico)
        .pipe(
          tap((resp: any) => {
            return resp;
          })
        );
    }
  }
}
