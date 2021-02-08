import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
})
export class ProductNewComponent implements OnInit {

  formulario: FormGroup; // Representa al formulari i els seus inputs

  crearFormulario() {
    this.formulario = this.formBuilder.group({ // Indicar els inputs esperables
      //han de coincidir en els formControlName del formulari
      name: ['', [Validators.required, // un array de validadors
      Validators.minLength(5),
      Validators.pattern('.*[a-zA-Z].*')]],
      price: [0, Validators.min(0.01)],
      description: [''],
      address: this.formBuilder.group({
        street: [''],
        city: ['']
      })
    });
  }
  constructor(private formBuilder: FormBuilder) {
    this.crearFormulario();
  }
  ngOnInit(): void {
  }

  get nameNotValid() {
    return this.formulario.get('name').invalid && this.formulario.get('name').touched
  }

  crear() {
    console.log(this.formulario);
  }
}
