import { Component, OnInit } from '@angular/core';
import { HEROES_PATH } from 'src/shared/constants/urls';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  jwt: string;
  isSumbitted = false;
  visible: boolean = false;
  resetVisible: boolean = false;
  path = HEROES_PATH;
  constructor(
    private userserv: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((param) => {
      if (!param.jwt) return;
      this.jwt = param.jwt;
      this.resetVisible = true;
    });
  }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}

  submit() {
    this.isSumbitted = true;
    const { value: password } = this.loginForm.controls.password;
    const { value: email } = this.loginForm.controls.email;
    this.userserv.login(email!, password!).subscribe((res: any) => {
      console.log(res);
      this.router.navigateByUrl('dashboard');
    });
  }
  onclick() {
    this.visible = !this.visible;
  }
  resetPassOnClick() {
    this.resetVisible = !this.resetVisible;
  }
  signup() {
    this.router.navigateByUrl('/signup');
  }
  // showError() {
  //   return;
  // }
}
