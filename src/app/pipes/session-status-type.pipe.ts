import { Pipe, PipeTransform } from '@angular/core';
import { SessionStatusType } from '../models/session/session-status-type';

/*
 * Prints the name of the SessionStatusType enumeration value
 * Usage:
 *   value | sessionStatusType
 * Example:
 *   {{ 1 |  sessionStatusType}}
 *   formats to: Reviewing
*/
@Pipe({name: 'sessionStatusType'})
export class SessionStatusTypePipe implements PipeTransform  {
    transform(value: SessionStatusType): string {
        return SessionStatusType[value];
    }
}
