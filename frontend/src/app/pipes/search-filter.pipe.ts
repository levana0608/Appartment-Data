import { Pipe, PipeTransform } from '@angular/core';
import { Apartment } from '../interfaces/apartment';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: Array<Apartment>, property: keyof Apartment, citySearch: string): null {

  //   if(value instanceof Array){
  //     value = value.filter((item: Apartment) => {
  //     item[property].includes(citySearch)
  //     })
  //   }
  //   // return value.filter(item => item[property].includes(term))
      
  //   return value;
    
  // }
  return null
  }

}
