import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { SessionProposal } from '../models/session/session-proposal';
import { AuthResult } from '../models/auth/auth-result';
import { SessionTrackType } from '../models/session/session-track-type';

import { AuthService } from './auth.service';
import { ConfigService } from '../services/config.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SessionService {

    private baseApiUrl: string;

    constructor(private config: ConfigService, private http: Http, private auth: AuthService) {
        this.baseApiUrl = config.get('baseApiUrl');
    }

    getSessionProposals(): Promise<SessionProposal[]> {
        return this.http.get(this.baseApiUrl + 'SessionProposals', {headers: this.getHeaders()})
            .toPromise()
            .then(r => {
                return r.json() as SessionProposal[];
            });
    }

    getAllSessionProposals(): Promise<SessionProposal[]> {
        return this.http.get(this.baseApiUrl + 'SessionProposals/List', {headers: this.getHeaders()})
            .toPromise()
            .then(r => {
                return r.json() as SessionProposal[];
            });
    }

    getAllAcceptedSessionProposals(): Promise<SessionProposal[]> {
        return this.http.get(this.baseApiUrl + 'SessionProposals/Accepted', {headers: this.getHeaders()})
            .toPromise()
            .then(r => {
                return r.json() as SessionProposal[];
            });
    }

    getSessionProposal(sessionProposalId: string): Promise<SessionProposal> {
        return this.http.get(this.baseApiUrl + 'SessionProposals/' + sessionProposalId, {headers: this.getHeaders()})
            .toPromise()
            .then(r => {
                return r.json() as SessionProposal;
            });
    }

    submitSession(session: SessionProposal): Promise<SessionProposal> {
        return this.http.post(this.baseApiUrl + 'SessionProposals', session, {headers: this.getHeaders()})
            .toPromise()
            .then(r => {
                return r.json() as SessionProposal;
            });
    }

    deleteSession(sessionProposalId: string): Promise<SessionProposal> {
        return this.http.delete(this.baseApiUrl + 'SessionProposals/' + sessionProposalId, {headers: this.getHeaders()})
            .toPromise()
            .then(r => {
                return r.json();
            });
    }

    voteForSession(sessionProposalId: string): Promise<boolean> {
        return this.http.post(this.baseApiUrl + 'Voting/Vote/' + sessionProposalId, {}, {headers: this.getHeaders()})
            .toPromise()
            .then(r => {
                return true;
            });
    }

    removeVoteForSession(sessionProposalId: string): Promise<boolean> {
        return this.http.post(this.baseApiUrl + 'Voting/Unvote/' + sessionProposalId, {}, {headers: this.getHeaders()})
            .toPromise()
            .then(r => {
                return true;
            });
    }

    updateSessionProposal(session: SessionProposal, sessionProposalId: string) : Promise<SessionProposal> {
        return this.http.put(this.baseApiUrl + 'SessionProposals/' + sessionProposalId, session, {headers: this.getHeaders()})
            .toPromise()
            .then(r => {
                return r.json() as SessionProposal;
            });
    }

    getAllUserFavorites(): Promise<SessionProposal[]> {
        return this.http.get(this.baseApiUrl + 'SessionProposals/Favorite/List', {headers: this.getHeaders()})
            .toPromise()
            .then(r => {
                return r.json() as SessionProposal[];
            });
    }

    private getHeaders(){
        // console.log(this.auth.authorizationToken());
        return new Headers({'Authorization': 'Basic ' + this.auth.authorizationToken()});
    }

}
