import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user/user';


@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    private user: User;
    constructor(
        private _route: ActivatedRoute,
        private authService: AuthService,
        private userService: UserService,
    ) {
        this.userService.getUser()
            .then(user => this.user = user);
    }

    ngOnInit() {
        this._route.params.subscribe(params => {
            // todo: something
        });
    }

    isLoggedIn() {
        if (this.authService.isAuthenticated()) {
            return true;
        }
        return false;
    }

    isAdmin() {
        if (this.user && this.user.Admin) {
            return true;
        }
        return false;
    }

    logout() {
        this.authService.logout();
    }
}
