import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../models/user/user';

import { UserService } from '../../../services/user.service';
@Component({
  selector: 'user-register-confirm',
  templateUrl: './user-register-confirm.component.html',
  styleUrls: ['./user-register-confirm.component.scss']
})
export class UserRegisterConfirmComponent {
  constructor(private UserService: UserService, private router: Router) {}
}
