import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UserService} from '../services/user.service';
import {User} from '../models/user/user';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) {}
    canActivate(): Promise<boolean> {
    return this.userService.getUser()
        .then(user => {
            if (user.Admin) {
                return true;
            }
            // Navigate to the schedule page in the user layout
            this.router.navigate(['/user/schedule']);
            return false;
        });
    }
}
 // Possible Solution 1
 // if (this.authService.isAdmin()) {
 //     return true;
 // }
