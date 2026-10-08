import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taxi',
})
export class TaxiPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
