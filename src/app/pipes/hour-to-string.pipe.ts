import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hourToString'
})
export class HourToStringPipe implements PipeTransform {

  transform(value: number, args?: any): string {
      let valueString: string;
    if (value <= 12) {
      valueString = value.toString();
      valueString = valueString + 'a';
    } else {
      value = value - 12;
        valueString = value.toString();
        valueString = valueString + 'p';
    }
    return valueString;
  }

}
