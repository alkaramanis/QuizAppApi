import { ReadVarExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { USERS_PATH } from 'src/shared/constants/urls';
import { IPasswordChange } from 'src/shared/interfaces/IPasswordChange';
import { User } from 'src/shared/models/User';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  private image: File;
  protected url = USERS_PATH;
  myProfileForm!: FormGroup;
  changePasswordForm: FormGroup;
  protected user: User;
  constructor(private userSer: UserService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.userSer.getMyProfile().subscribe((res: any) => {
      this.user = res.data.data;
      console.log(this.user);
      this.url = USERS_PATH + this.user.photo;
    });
    this.myProfileForm = this.formBuilder.group({
      name: [''],
      email: ['', [Validators.email]],
      photo: [''],
    });
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: [''],
      newPassword: [''],
      passwordConfirm: [''],
    });
  }
  get fc() {
    return this.myProfileForm.controls;
  }
  get fc2() {
    return this.changePasswordForm.controls;
  }

  onFileInput(e: any) {
    if (!e) return;
    const reader = new FileReader();
    this.image = e.target.files[0];
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e: any) => {
      this.url = e.target.result;
    };
  }
  onSubmit() {
    const formData = new FormData();
    if (this.image) formData.append('photo', this.image);
    if (this.fc.name.value) formData.append('name', this.fc.name.value);
    if (this.fc.email.value) formData.append('name', this.fc.email.value);

    // CHECKING IF THE OBJECT IS NULL. SURELY THERE ARE BETTER WAYS
    if (JSON.stringify(formData) === '{}') return;
    this.userSer.updateMyProfile(formData).subscribe();
  }
  onSubmit2() {
    const passwordInfo: IPasswordChange = {
      currentPassword: this.fc2.currentPassword.value,
      newPassword: this.fc2.newPassword.value,
      newPasswordConfirm: this.fc2.passwordConfirm.value,
    };
    console.log(passwordInfo);
    this.userSer.updatePassword(passwordInfo).subscribe();
  }
}
