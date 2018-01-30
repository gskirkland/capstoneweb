import { Pipe, PipeTransform } from '@angular/core';
import { SessionTrackType } from '../models/session/session-track-type';

/*
 * Prints the name of the SessionTrackType enumeration value
 * Usage:
 *   value | sessionTrackType
 * Example:
 *   {{ 3 |  sessionTrackType}}
 *   formats to: Entrepreneur
*/
@Pipe({name: 'sessionTrackType'})
export class SessionTrackTypePipe implements PipeTransform  {
    transform(value: SessionTrackType): string {
        return SessionTrackType[value];
    }
}