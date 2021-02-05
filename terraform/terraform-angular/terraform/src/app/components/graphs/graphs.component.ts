import { Component, Input, OnInit } from '@angular/core';
import { GData } from 'src/app/interfaces/g-data';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
})
export class GraphsComponent implements OnInit {

  constructor() { }

  public graphData: GData[] = [];

  ngOnInit(): void {
    //console.log(this.graphData[0]['series'].length);
    
  }

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
