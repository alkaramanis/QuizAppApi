import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
  styleUrls: ['./reset-password-modal.component.css'],
})
export class ResetPasswordModalComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Input() jwt: string;
  message = '';
  newPass: string = '';
  newPassConfirm: string = '';
  showMessage = false;
  constructor(private userSer: UserService) {}

  ngOnInit(): void {}
  closeModalonclick() {
    this.close.emit();
  }
  resetPassword() {
    this.userSer
      .resetpassword(this.newPass, this.newPassConfirm, this.jwt)
      .subscribe((res: any) => {
        if (res.status != 'success') {
          this.message = 'Something went wrong';
          this.showMessage = !this.showMessage;
          console.log(res, this.message, this.showMessage);
        } else {
          this.message = 'Your password has been changed';
          this.showMessage = !this.showMessage;
          console.log(res, this.message, this.showMessage);
        }
      });
  }
  endOfProccess() {
    this.close.emit();
  }
}
