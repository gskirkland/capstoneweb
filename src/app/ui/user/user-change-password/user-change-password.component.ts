import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user/user';
import { ChangePasswordRequest } from '../../../models/user/request/change-password-request';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'user-change-password',
    templateUrl: './user-change-password.component.html',
    styleUrls: ['./user-change-password.component.scss']
})
export class UserChangePasswordComponent implements OnInit {
  private changePasswordRequest: ChangePasswordRequest;
  private user: User;
  private changeSuccessful: boolean;
  private message: string
  private errorCallback: any;

  constructor(private UserService: UserService, private router: Router, private route: ActivatedRoute){}

  ngOnInit() {
      this.message = '';
      this.changeSuccessful = false;
      this.changePasswordRequest = new ChangePasswordRequest();
      this.errorCallback = e => {};
  }

  onSubmit() {

    if (this.changePasswordRequest.NewPassword !== this.changePasswordRequest.ConfirmPassword) {
        this.message = "New password fields must match exactly";
    }

    this.UserService.changePassword(this.changePasswordRequest)
      .then(newUser => {
          this.user = newUser;
          this.changeSuccessful = true;
          localStorage.setItem('AuthToken', newUser.AuthenticationToken);
      }, e => {
          if(e.status == 401) {
              this.message = "Your old password is incorrect, please try again";
          }
      });
  }
}
