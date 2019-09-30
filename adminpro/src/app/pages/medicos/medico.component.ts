import { Component, OnInit } from '@angular/core';
import { HospitalesService, MedicosService } from 'src/app/services/service.index';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(public hospitalesService: HospitalesService, public medicosService: MedicosService, public router: Router) { }

  ngOnInit() {
    this.hospitalesService.cargarHospitales().subscribe(hospitales => this.hospitales = hospitales);
  }

  GuardarMedico(f: NgForm) {
    if (f.invalid) {
      return;
    }

    this.medicosService.guardarMedico(this.medico).subscribe((medico: Medico) => {

        this.medico._id = medico._id;
        this.router.navigate(['medico', medico._id]);
    });
  }

  CambioHospital(id: string) {
    this.hospitalesService.obtenerHospital(id)
      .subscribe(hospital => this.hospital = hospital);
  }
}
