import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Sponsor } from '../models/sponsor/sponsor';
import {Http} from '@angular/http';

@Injectable()
export class SponsorService {
    private baseApiUrl: string;

    constructor(private config: ConfigService, private http: Http) {
        this.baseApiUrl = config.get('baseApiUrl');
    }

    getSponsors(): Promise<Sponsor[]> {
        return this.http.get(this.baseApiUrl + 'Sponsors/List')
            .toPromise()
            .then(r => {
                return r.json() as Sponsor[];
            });
    }
}
