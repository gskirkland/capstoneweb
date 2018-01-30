import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class EventService {

    constructor(private http: Http) {}

    getEvents() {
        return this.http.get('http://10.211.55.3:50634/api/SessionProposals/MockEventList')
            .toPromise()
            .then(res => <any[]> res.json().data)
            .then(data => { return data; });
    }
}
