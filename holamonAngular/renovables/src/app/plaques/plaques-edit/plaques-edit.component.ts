import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Placa } from '../placa';
import { PlaquesService } from '../plaques.service';

@Component({
  selector: 'app-plaques-edit',
  templateUrl: './plaques-edit.component.html',
})
export class PlaquesEditComponent implements OnInit {

  placa: Placa;
  @ViewChild('placaForm',{static:true}) placaForm: NgForm;


  constructor(private activatedRoute: ActivatedRoute,
    private plaquesService: PlaquesService ) { }

  ngOnInit(): void {
    this.placa = this.activatedRoute.snapshot.data['placa'];
  }

  editar(){

    console.log(this.placa);
    this.plaquesService.editPlaca(this.placaForm.value).subscribe(
      p => this.placa = p
    );
    return false;

  }


}
