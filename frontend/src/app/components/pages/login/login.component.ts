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
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}
  submit() {
    const { value: password } = this.loginForm.controls.password;
    const { value: username } = this.loginForm.controls.username;
    this.userserv.login(username!, password!).subscribe((res: any) => {
      this.router.navigateByUrl('dashboard');
    });
  }
  onclick() {
    this.visible = !this.visible;
  }
  resetPassOnClick() {
    this.resetVisible = !this.resetVisible;
  }
}
