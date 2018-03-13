import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'mapToIterable'
})
export class MapToIterablePipe implements PipeTransform {
    transform(dict: Object) {
        let iterArray = [];
        for (let key in dict) {
            if (dict.hasOwnProperty(key)) {
                iterArray.push({key: key, val: dict[key]});
            }
        }
        return iterArray;
    }
}

