import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    constructor(
        private _route: ActivatedRoute,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this._route.params.subscribe(params => {
            // todo: something
        });
    }

    isLoggedIn() {
        if (this.authService.isAuthenticated()) {
            return true;
        }
        return true;
    }

    logout() {
        this.authService.logout();
    }
}