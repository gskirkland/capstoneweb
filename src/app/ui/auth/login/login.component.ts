import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthResult } from '../../../models/auth/auth-result';
import { ClearPasswordRequest } from '../../../models/user/request/clear-password-request';
import { SendActivationEmailRequest } from '../../../models/user/request/send-activation-email-request';
import { AuthenticateStatusCode } from '../../../models/auth/authenticate-status-code';

import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    email: string = '';
    password: string = '';
    error: string = '';
    message: string = '';
    showPasswordReset = false;
    showConfirmEmail = false;

    constructor(private authService: AuthService, private userService: UserService, private router: Router) {}

    onPasswordResetClick() {
        if (!this.email) {
            this.error = 'You must enter a valid email to continue';
        }

        const request = new ClearPasswordRequest();

        request.Email = this.email;
        this.userService.clearPassword(request)
            .then(response => {
                if (response.ok) {
                    this.message = 'Your password has been reset! Please check your email to continue';
                }
            });
    }

    onConfirmEmailClick() {
        const request = new SendActivationEmailRequest();

        request.Email = this.email;
        this.userService.sendActivationEmail(request)
            .then(response => {
                if (response.ok) {
                    this.message = 'Your account has been created, please sign in to continue';
                }
            });
    }

    onSubmit() {
        this.error = '';
        this.authService.login(this.email, this.password).then(
            (result: AuthResult) => {
                switch (result.Status){
                    case 200:
                        const authDetail = result.AuthenticationDetail;
                        if (authDetail) {
                            switch (authDetail.Status) {
                                case AuthenticateStatusCode.AccountLocked:
                                    this.error = 'This account is currently locked.';
                                    this.showPasswordReset = true;
                                    break;
                                case AuthenticateStatusCode.EmailConfirmationRequired:
                                    this.error = 'You must confirm your email before you can log in.';
                                    this.showConfirmEmail = true;
                                    break;
                                case AuthenticateStatusCode.InvalidCredentials:
                                    this.error = 'Invalid credentials.';
                                    break;
                                case AuthenticateStatusCode.Active:
                                    this.router.navigate(['/sessions']);
                                    break;
                                default:
                                    console.log('Detail Status Invalid');
                                    break;
                            }
                        }
                        break;
                    case 401:
                    case 404:
                        this.error = 'Invalid credentials';
                        break;
                    default:
                        this.error = 'Internal Error';
                        break;
                }
            }
        );
    }
}