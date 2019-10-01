import { Component, OnInit } from '@angular/core';
import { HospitalesService, MedicosService } from 'src/app/services/service.index';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(public hospitalesService: HospitalesService,
              public medicosService: MedicosService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public modalUploadService: ModalUploadService ) {

    activatedRoute.params.subscribe(params => {
      const id = params.id;

      if ( id !== 'nuevo') {
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit() {
    this.hospitalesService.cargarHospitales().subscribe(hospitales => this.hospitales = hospitales);

    this.modalUploadService.notificacion.subscribe(resp => {
      this.medico.img = resp.medico.img;
    });
  }

  GuardarMedico(f: NgForm) {
    if (f.invalid) {
      return;
    }

    this.medicosService.guardarMedico(this.medico).subscribe((medico: Medico) => {

        this.medico._id = medico._id;
        this.router.navigate(['medicos', medico._id]);
    });
  }

  CambioHospital(id: string) {
    this.hospitalesService.obtenerHospital(id)
      .subscribe(hospital => this.hospital = hospital);
  }

  cargarMedico(id: string) {
    this.medicosService.cargarMedico(id).subscribe(medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.CambioHospital(this.medico.hospital);
    });
  }

  cambiarFoto() {
    this.modalUploadService.mostrarModal('medico', this.medico._id);
  }
}
