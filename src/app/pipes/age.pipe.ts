import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: string): number {
    const birthDate = new Date(value);
    const timeDiff = Math.abs(Date.now() - birthDate.getTime());
    return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  }
  
}



