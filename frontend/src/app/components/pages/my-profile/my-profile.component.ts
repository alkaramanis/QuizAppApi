import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/shared/models/User';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  private user: User;
  constructor(private userSer: UserService) {
    this.userSer.getMyProfile().subscribe((res: any) => {
      console.log(res);
    });
  }

  ngOnInit(): void {}
}
