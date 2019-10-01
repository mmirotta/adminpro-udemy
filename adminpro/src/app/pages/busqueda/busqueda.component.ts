import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  hospitales: Hospital[] = [];
  medicos: Medico[] = [];

  constructor(public activatedRoute: ActivatedRoute, public http: HttpClient) {
    activatedRoute.params.subscribe(params => {
      const termino = params.termino;
      this.buscar(termino);
    });
  }

  ngOnInit() {
  }

  buscar(termino: string) {
    this.http.get(URL_SERVICE + '/busqueda/todo/' + termino).subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
      this.medicos = resp.medicos;
      this.usuarios = resp.usuarios;
    });
  }

}
