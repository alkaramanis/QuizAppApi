import { Component, OnInit } from '@angular/core';
import { HEROES_PATH } from 'src/shared/constants/urls';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  path = HEROES_PATH;
  constructor(private userserv: UserService, private router: Router) {}
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
}
