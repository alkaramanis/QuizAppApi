import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/shared/models/User';
import { Observable } from 'rxjs';
import {
  FORGOT_PASSWORD_URL,
  LOGIN_URL,
  MY_PROFILE_EDIT_URL,
  RESET_PASSWORD_URL,
} from 'src/shared/constants/urls';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  login(email: string, password: string): Observable<User> {
    const body = { email, password };
    const httpOptions = { withCredentials: true };
    return this.http.post<User>(LOGIN_URL, body, httpOptions);
  }
  signup() {}
  forgetpassword(email: string) {
    return this.http.post<any>(FORGOT_PASSWORD_URL, { email });
  }
  resetpassword(newPass: string, newPassConfirm: string, jwt: string) {
    const body = { password: newPass, passwordConfirm: newPassConfirm };
    console.log(body);
    return this.http.patch<any>(RESET_PASSWORD_URL + jwt, body);
  }
  getMyProfile(): Observable<User> {
    const httpOptions = { withCredentials: true };
    return this.http.get<User>(MY_PROFILE_EDIT_URL, httpOptions);
  }
  constructor(private http: HttpClient) {}
}
