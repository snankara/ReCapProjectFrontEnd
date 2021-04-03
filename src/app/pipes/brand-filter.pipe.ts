import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'brandFilter'
})
export class BrandFilterPipe implements PipeTransform {

  transform(value: Car[], brandFilterText: string): Car[] {
    brandFilterText = brandFilterText?brandFilterText.toLocaleLowerCase() : ""
    return brandFilterText?value.filter((c:Car) => c.brandName.toLocaleLowerCase().indexOf(brandFilterText)!==-1):value;
  }

}
