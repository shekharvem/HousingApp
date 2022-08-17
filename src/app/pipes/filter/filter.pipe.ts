import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], fitlerString: string, propName: string): any[] {
    const resultArray =[];
    if(value && value.length == 0 || fitlerString == '' || propName == "") {
      return value
    }

    for(const item of value) {
      if(item[propName].toLowerCase() === fitlerString.toLowerCase()) {
        resultArray.push(item)
      }
    }
    return resultArray
    
  }

}
