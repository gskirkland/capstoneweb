import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service';

import { AuthResult } from '../models/auth/auth-result';
import { User } from '../models/user/user';
import { ChangePasswordRequest} from '../models/user/request/change-password-request';
import { ResetPasswordRequest} from '../models/user/request/reset-password-request';
import { ClearPasswordRequest} from '../models/user/request/clear-password-request';
import { SendActivationEmailRequest} from '../models/user/request/send-activation-email-request';
import { CreateUserRequest } from '../models/user/request/create-user-request';

import { ConfigService } from '../services/config.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

    private baseApiUrl: string;

    constructor(private config: ConfigService, private http: Http, private auth: AuthService) {
        this.baseApiUrl = config.get('baseApiUrl');
    }

    getUser(): Promise<User> {
        return this.http.get(this.baseApiUrl + 'Users', {headers: this.getHeaders()})
            .toPromise()
            .then(r => {
                return r.json() as User;
            });
    }

    register(request: CreateUserRequest): Promise<any> {
        return this.http.post(this.baseApiUrl + 'Users/Register', request)
            .toPromise()
            .then(r => {
                localStorage.setItem('AuthToken', r.json().AuthenticationToken);
                return r;
            }, r => {
                return r;
            });
    }

    updateUser(user: User): Promise<User> {
        return this.http.put(this.baseApiUrl + 'Users', user, {headers: this.getHeaders()})
            .toPromise()
            .then(r => {
                return r.json() as User;
            });
    }

    uploadPhoto(file: any): Promise<User> {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post(this.baseApiUrl + 'Users/PostImage', formData, {headers: this.getHeaders()})
            .toPromise()
            .then(r => {
                return r.json() as User;
            });

    }

    changePassword(request: ChangePasswordRequest): Promise<User> {
        return this.http.put(this.baseApiUrl + 'Users/ChangePassword', request, {headers: this.getHeaders()})
            .toPromise()
            .then(r => {
                return r.json() as User;
            });
    }

    resetPassword(resetToken: string, request: ResetPasswordRequest): Promise<User> {
        return this.http.put(this.baseApiUrl + 'Users/ResetPassword/' + resetToken , request, {headers: this.getHeaders()})
            .toPromise()
            .then(r => {
                return r.json() as User;
            });
    }

    clearPassword(request: ClearPasswordRequest): Promise<any> {
        return this.http.put(this.baseApiUrl + 'Users/ResetPassword', request, {headers: this.getHeaders()})
            .toPromise()
            .then(r => {
                // TODO - Handle error response
                return r;
            });
    }

    activateUser(activationCode: string): Promise<User> {
        return this.http.post(this.baseApiUrl + 'Users/Activate/' + activationCode, {headers: this.getHeaders()})
            .toPromise()
            .then(r => {
                return r.json() as User;
            });
    }

    sendActivationEmail(request: SendActivationEmailRequest) : Promise<any> {
        return this.http.post(this.baseApiUrl + 'Users/Activate', {headers: this.getHeaders()})
            .toPromise()
            .then(r => {
                // TODO - Handle error response
                return r;
            });
    }

    private getHeaders(){
        return new Headers({'Authorization': 'Basic ' + this.auth.authorizationToken()});
    }

}