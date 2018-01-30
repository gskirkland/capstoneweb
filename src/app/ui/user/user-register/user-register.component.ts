import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CreateUserRequest } from '../../../models/user/request/create-user-request';
import { User } from '../../../models/user/user';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})

export class UserRegisterComponent {
  createUserRequest: CreateUserRequest = new CreateUserRequest();
  user: User;
  message: string = '';

  constructor(private UserService: UserService, private router: Router){}

  onSubmit(){
    this.UserService.register(this.createUserRequest)
      .then(result => {
        switch (result.status) {
          case 200:
              this.user = result.json();
              this.router.navigate(['/sessions']);
              break;
          case 400:
              this.message = JSON.parse(result.text()).Message;
              break;
        }
      });
  }
}
