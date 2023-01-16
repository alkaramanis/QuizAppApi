import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/shared/models/User';
import { Observable } from 'rxjs';
import {
  FORGOT_PASSWORD_URL,
  LOGIN_URL,
  MY_PROFILE_EDIT_URL,
  RESET_PASSWORD_URL,
  SIGN_UP_URL,
} from 'src/shared/constants/urls';
import { IUserSignup } from 'src/shared/interfaces/IUserSignup';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOptions = { withCredentials: true };

  login(email: string, password: string): Observable<User> {
    const body = { email, password };

    return this.http.post<User>(LOGIN_URL, body, this.httpOptions);
  }
  signup(userSignup: IUserSignup): Observable<User> {
    return this.http.post<User>(SIGN_UP_URL, userSignup, this.httpOptions).pipe(
      tap({
        next: (user) => {},
      })
    );
  }

  forgetpassword(email: string) {
    return this.http.post<any>(FORGOT_PASSWORD_URL, { email });
  }

  resetpassword(newPass: string, newPassConfirm: string, jwt: string) {
    const body = { password: newPass, passwordConfirm: newPassConfirm };
    console.log(body);
    return this.http.patch<any>(RESET_PASSWORD_URL + jwt, body);
  }

  getMyProfile(): Observable<User> {
    return this.http
      .get<User>(MY_PROFILE_EDIT_URL, this.httpOptions)
      .pipe(tap((user) => {}));
  }
  constructor(private http: HttpClient) {}
}
