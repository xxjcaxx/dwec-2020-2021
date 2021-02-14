import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Placa } from '../placa';
import { PlaquesService } from '../plaques.service';

@Component({
  selector: 'app-plaques-detail',
  templateUrl: './plaques-detail.component.html',
})
export class PlaquesDetailComponent implements OnInit {

  placa: Placa;

  constructor(private activatedRoute: ActivatedRoute,
    private plaquesService: PlaquesService ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(p =>  {
      this.plaquesService.getPlaca(p.id).subscribe(placa => this.placa = placa);
    });
  }

}
