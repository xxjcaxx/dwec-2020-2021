import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPlanet } from '../i-planet';
import { PlanetService } from '../planet.service';
import { PlanetaryChanges } from '../planetary-changes';

interface Series{
  name: string;
  value: number;
}
interface GData {
  name: string;
  series: Array<Series>;
}


@Component({
  selector: 'app-planet-detail',
  templateUrl: './planet-detail.component.html',

})
export class PlanetDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private planetService: PlanetService) { }

  planet!: IPlanet;
  pChanges!: PlanetaryChanges[];

  graphData: GData[] =  [
   {"name": "energy", "series": []},
    {"name": "greenhouse", "series": []},
    {"name": "average_temperature", "series": []}
  ];

  image = '';

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(p => {
      this.planet = {name: 'Loading', id: p.id, image: '/assets/img/default-placeholder.png'}
      this.planetService.getPlanet(p.id).subscribe(
        plnt => {
          this.planet = plnt;
          if (this.planet.image !== undefined) {
            this.image = `data:image/jpg;base64,${this.planet.image}`
          }
          else {
              this.image = '/assets/img/default-placeholder.png'
          }
          this.planetService.getPlanetChanges(p.id).subscribe(
            plntchg => {
              this.pChanges = plntchg;
              //console.log(this.pChanges);
              this.pChanges.map(pc => {

                  this.graphData.find(d => d.name === 'energy')?.series.push({name:pc.time,value:pc.energy}); 
                  this.graphData.find(d => d.name === 'greenhouse')?.series.push({name:pc.time,value:pc.greenhouse}); 
                  this.graphData.find(d => d.name === 'average_temperature')?.series.push({name:pc.time,value:pc.average_temperature});
              });
              console.log(this.graphData);
              this.graphData = [...this.graphData];
             }
          );
        },
        error => this.planet.name = 'Error '+error,
        () => console.log('complete')
      );
    });
  }

/////////////////Per el grafic
  multi: any[] = [
  {"name": "energy", "series": []},
  {"name": "greenhouse", "series": []},
  {"name": "emission", "series": []},
  {"name": "average_temperature", "series": []}
];

  view: [number,number] = [700, 700]; 

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Data';
  yAxisLabel: string = 'Value';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }


}
