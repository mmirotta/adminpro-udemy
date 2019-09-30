import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
declare var swal: any;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url: string = URL_SERVICE;
  public usuario: Usuario;
  public token: string;

  constructor(public http: HttpClient, public router: Router, public subirArchivoService: SubirArchivoService) {
    this.cargarStorage();
  }

  usuarioLogueado() {
    return this.token.length > 5 ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  crearUsuario(usuario: Usuario): Observable<Usuario> {

    return this.http.post(this.url + '/usuario', usuario).pipe(tap((resp: any) => {
      return resp.usuario;
    }));
  }

  loginGoogle(token: string) {
    return this.http.post(this.url + '/login/google', {token}).pipe(tap((resp: any) => {

      this.guardarStorage(resp.id, resp.token, resp.usuario);

      return resp.usuario;
    }));
  }

  login(usuario: Usuario, recordar: boolean = false): Observable<Usuario> {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(this.url + '/login', usuario).pipe(tap((resp: any) => {

      this.guardarStorage(resp.id, resp.token, resp.usuario);

      return resp.usuario;
    }));
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logOut() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  actualizarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put(this.url + '/usuario/' + usuario._id + '?token=' + this.token, usuario)
      .pipe(tap((resp: any) => {
        if (usuario._id === this.usuario._id) {
          this.usuario = resp.usuario;
          this.guardarStorage(resp.usuario._id, this.token, this.usuario);
        }
        // swal('Usuario Actualizado', this.usuario.nombre, 'success');
        return resp.usuario;
      }));

  }

  cambiarImagen(file: File, id: string) {
    this.subirArchivoService.subirAchivo(file, 'usuarios', id)
        .then((resp: any) => {
          this.usuario.img = resp.usuario.img;
          this.guardarStorage(resp.usuario._id, this.token, this.usuario);
        })
        .catch(resp => {
          console.error(resp);
        });
  }

  cargarUsuarios(desde: number = 0) {
    return this.http.get(this.url + '/usuario?desde=' + desde).pipe(tap((resp: any) => {
      return resp;
    }));
  }

  buscarUsuario(termino: string) {
    return this.http.get(this.url + '/busqueda/coleccion/usuarios/' + termino).pipe(tap((resp: any) => {
      console.log(resp.usuarios);
      return resp.usuarios;
    }));
  }

  borrarUsuario(id: string) {
    return this.http.delete(this.url + '/usuarios/' + id + '?token=' + this.token).pipe(tap((resp: any) => {
      swal('Usuario Borrado', this.usuario.nombre, 'success');
      return resp;
    }));
  }
}
