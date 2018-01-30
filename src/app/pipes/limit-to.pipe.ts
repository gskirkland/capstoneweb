import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'limitTo'})
export class LimitToPipe implements PipeTransform {
    transform(value: string, limit: number): string {
        if (value.length > limit){
            // cut the string at the last word boundary less than the specified limit
            return value.substring(0, value.lastIndexOf(' ', limit)) + ' ...';
        } else {
            return value;
        }
    }
}
