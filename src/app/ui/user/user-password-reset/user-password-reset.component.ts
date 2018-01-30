import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../../models/user/user';
import { ResetPasswordRequest } from '../../../models/user/request/reset-password-request';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'user-password-reset',
  templateUrl: './user-password-reset.component.html',
  styleUrls: ['./user-password-reset.component.scss']
})
export class UserPasswordResetComponent implements OnInit, OnDestroy{
  private sub: any;
  private resetCode: string;
  private resetPasswordRequest: ResetPasswordRequest;
  private user: User;

  constructor(private UserService: UserService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(){
    this.resetPasswordRequest = new ResetPasswordRequest();
    this.sub = this.route.params.subscribe(params => {
        this.resetCode = params['PasswordResetToken'];
    });
  }

  onSubmit() {
    this.UserService.resetPassword(this.resetCode, this.resetPasswordRequest)
      .then(newUser => {
          this.user = newUser;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}