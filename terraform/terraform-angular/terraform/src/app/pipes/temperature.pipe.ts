import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {

  transform(temp: number, ...args: unknown[]): string {
    return `${temp}º`;
  }

}
