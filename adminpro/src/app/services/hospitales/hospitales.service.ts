import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from 'src/app/models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {
  private url: string = URL_SERVICE;
  public totalRegistro: number = 0;

  constructor(public http: HttpClient, public usuarioService: UsuarioService) { }

  cargarHospitales() {
    return this.http.get(this.url + '/hospital').pipe(tap((resp: any) => {
      this.totalRegistro = resp.total;
      return resp.hospitales;
    }));
  }

  obtenerHospital(id: string) {
    return this.http.get(this.url + '/hospital/' + id).pipe(tap((resp: any) => {
      return resp.hospital;
    }));
  }

  buscarHospital(termino: string) {
    return this.http.get(this.url + '/busqueda/coleccion/hospitales/' + termino).pipe(tap((resp: any) => {
      return resp.hospitales;
    }));
  }

  borrarHospital(id: string) {
    return this.http.delete(this.url + '/hospital/' + id + '?token=' + this.usuarioService.token).pipe(tap((resp: any) => {
      return resp;
    }));
  }

  crearHospital(nombre: string) {
    return this.http.post(this.url + '/hospital/?token=' + this.usuarioService.token, {nombre})
        .pipe(tap((resp: any) => {
          return resp;
        }));
  }

  actualizarHospital(hospital: Hospital) {
    return this.http.put(this.url + '/hospital/' + hospital._id + '?token=' + this.usuarioService.token, hospital)
        .pipe(tap((resp: any) => {
          return resp.hospital;
        }));
  }
}
