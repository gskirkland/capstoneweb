import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'user-email-activation',
  templateUrl: './user-email-activation.component.html',
  styleUrls: ['./user-email-activation.component.scss']
})
export class UserEmailActivationComponent implements OnInit, OnDestroy {
  private sub: any;
  private activationCode: string;
  private user: User;

  constructor(private UserService: UserService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(){
    this.sub = this.route.params.subscribe(params => {
      this.activationCode = params['EmailActivationToken'];
      this.UserService.activateUser(this.activationCode)
        .then(newUser => {
            this.user = newUser;
            this.router.navigate(['/sessions']);
        });
    });
  }

  ngOnDestroy() {
      this.sub.unsubscribe();
  }

}