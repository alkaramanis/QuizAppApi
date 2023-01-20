import { ReadVarExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { USERS_PATH } from 'src/shared/constants/urls';
import { User } from 'src/shared/models/User';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  protected url = USERS_PATH;
  myProfileForm!: FormGroup;
  protected user: User;
  constructor(private userSer: UserService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.userSer.getMyProfile().subscribe((res: any) => {
      this.user = res.data.data;
      this.url = USERS_PATH + this.user.photo;
    });
    this.myProfileForm = this.formBuilder.group({
      name: [''],
      email: ['', [Validators.email]],
      file: [''],
    });
    console.log(this.myProfileForm);
  }
  get fc() {
    return this.myProfileForm.controls;
  }
  onFileInput(e: any) {
    if (!e) return;
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e: any) => {
      this.url = e.target.result;
    };
  }
}
