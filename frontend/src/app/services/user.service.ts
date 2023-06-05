import { Injectable } from '@angular/core';
import { IUserResponse } from 'src/shared/interfaces/IUserResponse';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/shared/models/User';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  FORGOT_PASSWORD_URL,
  LOGIN_URL,
  LOGOUT_URL,
  MY_PROFILE_EDIT_URL,
  RESET_PASSWORD_URL,
  SIGN_UP_URL,
  UPDATE_MY_PROFILE,
  UPDATE_PASSWORD,
} from 'src/shared/constants/urls';
import { IUserSignup } from 'src/shared/interfaces/IUserSignup';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { IPasswordChange } from 'src/shared/interfaces/IPasswordChange';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpOptions = { withCredentials: true };
  private user: User = this.getUserFromLocalStorage();
  private userSubject: BehaviorSubject<User> = new BehaviorSubject(this.user);

  getUserObservable(): Observable<User> {
    return this.userSubject.asObservable();
  }
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private authServ: AuthService
  ) {}

  login(email: string, password: string): Observable<IUserResponse> {
    const body = { email, password };

    return this.http
      .post<IUserResponse>(LOGIN_URL, body, { withCredentials: true })
      .pipe(
        tap({
          next: (userResponse) => {
            this.userSubject.next(userResponse.data.user);
            this.setUserToLocalStorage(userResponse.data.user);
            this.authServ.login();
            this.toastr.success('You successfully login');
          },
          error: (userResponse) =>
            this.toastr.error('Something went wrong', userResponse),
        })
      );
  }
  logout(): Observable<User> {
    return this.http.get<User>(LOGOUT_URL, this.httpOptions).pipe(
      tap({
        next: (res) => {
          this.userSubject.next(new User());
          this.setUserToLocalStorage(new User());
          this.toastr.success('You successfully logout');
        },
        error: (res) => {
          this.toastr.error('Something went wrong');
        },
      })
    );
  }
  signup(userSignup: IUserSignup): Observable<IUserResponse> {
    return this.http
      .post<IUserResponse>(SIGN_UP_URL, userSignup, this.httpOptions)
      .pipe(
        tap({
          next: (userResponse) => {
            this.authServ.loggedinSubject.next(true);
            this.userSubject.next(userResponse.data.user);
            this.setUserToLocalStorage(userResponse.data.user);
            this.toastr.success('You succesfully signup!');
          },
          error: () => {
            this.toastr.error('Somenthing went wrong');
          },
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
  updatePassword(newPassInterface: IPasswordChange): Observable<IUserResponse> {
    return this.http
      .patch<IUserResponse>(UPDATE_PASSWORD, newPassInterface, this.httpOptions)
      .pipe(
        tap({
          next: (userResponse) => {
            this.userSubject.next(userResponse.data.user);
            this.setUserToLocalStorage(userResponse.data.user);
            this.toastr.success('You successfully Update Your Password');
            console.log(userResponse);
          },
          error: (userResponse) => {
            this.toastr.error('Something went wrong', userResponse),
              console.log(userResponse);
          },
        })
      );
  }

  getMyProfile(): Observable<User> {
    return this.http
      .get<User>(MY_PROFILE_EDIT_URL, this.httpOptions)
      .pipe(tap((user) => {}));
  }
  setUserToLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  getUserFromLocalStorage(): User {
    const strUser = localStorage.getItem('user');
    return strUser ? JSON.parse(strUser) : new User();
  }
  updateMyProfile(formData: FormData): Observable<IUserResponse> {
    console.log(formData);
    return this.http
      .patch<IUserResponse>(UPDATE_MY_PROFILE, formData, this.httpOptions)
      .pipe(
        tap({
          next: (userResponse) => {
            this.userSubject.next(userResponse.data.user);
            this.setUserToLocalStorage(userResponse.data.user);
            this.toastr.success('You successfully Update Your Profile');
            console.log(userResponse.data.user);
          },
          error: (userResponse) =>
            this.toastr.error('Something went wrong', userResponse),
        })
      );
  }
}
