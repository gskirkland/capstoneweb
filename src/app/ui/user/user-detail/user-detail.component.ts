import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user/user';
import { Router, ActivatedRoute } from '@angular/router';

declare var jQuery: any;

@Component({
    selector: 'user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})

export class UserDetailComponent {
  private sub: any;
  private user: User;
  private userId: string;

  constructor(private UserService: UserService, private router: Router, private route: ActivatedRoute){}

  ngOnInit() {
    var $ = jQuery;
    this.user = new User();

    this.UserService.getUser()
        .then(currentUser => {
                this.user = currentUser;
    });

    $('#fileUpload').on('change',function(){
        $('.avatar').removeClass('open');
    });
    $('.avatar').on('click',function(){
        $(this).addClass('open');
    });

    $('html').click(function() {
        $('.avatar').removeClass('open');
    });

    $('.avatar').click(function(event){
        event.stopPropagation();
    });
  }


  public fileChangeEvent(fileInput: any){
    var $ = jQuery;

    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e : any) {
          $('#preview').attr('src', e.target.result);
      }

      reader.readAsDataURL(fileInput.target.files[0]);

      this.UserService.uploadPhoto(fileInput.target.files[0])
        .then(newUser => {
            this.user = newUser;
        });
    }
  }

  updateUser(){
    this.UserService.updateUser(this.user)
      .then(newUser => {
          this.user = newUser;
          this.router.navigate(['/sessions']);
      });
  }

}