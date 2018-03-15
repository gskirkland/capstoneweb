import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterPipe',
})
export class FilterPipe implements PipeTransform {
  transform(data: any, searchTerm: string, searchVariable: string): any {
    if( searchTerm !== undefined && (typeof data === 'object') !== false && searchTerm !== '') {
      searchTerm = searchTerm.toUpperCase();
      return data.filter(item => {
        if ((typeof item[searchVariable]) === 'string') {
          return item[searchVariable].toUpperCase().indexOf(searchTerm) !== -1;
        }else if ((typeof item[searchVariable]) === 'number') {
          if ( searchTerm !== 'ALL') {
            return (item[searchVariable] === searchTerm) ? true : false;
          } else {
            return data;
          }
        } else {
          // console.log("INVALID Attribute: " + searchVariable);
          return data;
        }
      });
    } else {
      return data;
    }
  }
}
