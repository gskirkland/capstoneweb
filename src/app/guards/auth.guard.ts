import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate() {
        // if(this.authService.isAuthenticated()) return true;
        //
        // // Navigate to the login page with extras
        // this.router.navigate(['/login']);
        return true;
    }
}