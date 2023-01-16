import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { IUserSignup } from 'src/shared/interfaces/IUserSignup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['sasasa', [Validators.required, Validators.minLength(3)]],
      email: ['sasa@gmail.com', [Validators.required, Validators.email]],
      password: ['12345678', [Validators.required, Validators.minLength(5)]],
      passwordConfirm: [
        '12345678',
        [Validators.required, Validators.minLength(5)],
      ],
    });
  }
  get fc() {
    return this.signupForm.controls;
  }
  showErrors() {
    return this.fc.email.dirty && this.fc.email.touched && this.fc.email.errors;
  }
  signup() {
    const fv = this.signupForm.value;
    const registingUser: IUserSignup = {
      name: fv.name,
      email: fv.email,
      password: fv.password,
      passwordConfirm: fv.passwordConfirm,
    };
    this.userService.signup(registingUser).subscribe((user) => {
      console.log(user);
    });
  }
}
