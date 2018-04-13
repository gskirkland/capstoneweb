import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

import { AuthResult } from '../models/auth/auth-result';
import { AuthenticateResponse } from '../models/auth/authenticate-response';

import { ConfigService } from '../services/config.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

    private baseApiUrl: string;
    private headers: Headers = new Headers({'Content-Type': 'application/json'});

    constructor(private config: ConfigService, private http: Http, private router: Router) {
        this.baseApiUrl = config.get('baseApiUrl');
    }

    login(email, password){
        return this.http.post(
                this.baseApiUrl + 'Users/Login',
                JSON.stringify({ Email: email, Password: password }),
                {headers: this.headers})
            .toPromise()
            .then(r => {
                const result = new AuthResult(r.status, 'Unauthorized');
                if (result.Result) {
                    let authResponse = new AuthenticateResponse();
                    authResponse = r.json();
                    result.setAuthDetail(authResponse);
                    if (authResponse.AuthenticationToken) {
                        localStorage.setItem('AuthToken', r.json().AuthenticationToken);
                    }
                }
                return result;
            }, r => {
                return new AuthResult(r.status, 'Internal Error');
            });
    }

    authorizationToken() {
        return localStorage.getItem('AuthToken');
    }

    logout() {
        localStorage.removeItem('AuthToken');
        this.router.navigate(['/home/login']);
    }

    isAuthenticated() {
        return (localStorage.getItem('AuthToken') != null);
    }
}
