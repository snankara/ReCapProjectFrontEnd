import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'colorFilter'
})
export class ColorFilterPipe implements PipeTransform {

  transform(value: Car[], colorFilterText: string): Car[] {
    colorFilterText = colorFilterText? colorFilterText.toLocaleLowerCase() : ""
    return colorFilterText?value.filter((c:Car) => c.colorName.toLocaleLowerCase().indexOf(colorFilterText)!==-1):value;
  }

}
