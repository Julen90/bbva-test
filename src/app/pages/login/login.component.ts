import { AuthenticationService } from './../../core/services/authetication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private  router:  Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  login(){
    if( this.loginForm.valid ) {
      this.authService.login(this.loginForm.value).subscribe((res: boolean)=>{
        console.log( res );
        if ( res ) {
          this.router.navigateByUrl('counter');
        }
      });
    }
  }

  initializeForm(): void {
    this.loginForm = new FormGroup({
      user: new FormControl(''),
      password: new FormControl('')
    });
  }

}
