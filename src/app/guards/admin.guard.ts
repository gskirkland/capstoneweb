import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UserService} from '../services/user.service';
import {User} from '../models/user/user';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}
  canActivate(): boolean {
    this.userService.getUser()
        .then(user => {
            if (user.IsAdmin) {
                return true;
            }
            // Navigate to the schedule page in the user layout
            // Testing upstream issue
            this.router.navigate(['/user/schedule']);
            return false;
        });
  }
}
