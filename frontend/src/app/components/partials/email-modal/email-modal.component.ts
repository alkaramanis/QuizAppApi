import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-email-modal',
  templateUrl: './email-modal.component.html',
  styleUrls: ['./email-modal.component.css'],
})
export class EmailModalComponent implements OnInit {
  @Output() close = new EventEmitter();
  email: string = '';
  constructor(private userServ: UserService) {}

  ngOnInit(): void {}
  closeModalonclick() {
    this.close.emit();
  }
  newPasswordRequest() {
    this.userServ.forgetpassword(this.email).subscribe((res) => {
      console.log(res);
    });
    this.close.emit();
  }
}
