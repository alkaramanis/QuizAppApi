import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/shared/models/User';
import { Observable } from 'rxjs';
import { LOGIN_URL } from 'src/shared/constants/urls';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  login(email: string, password: string): Observable<User> {
    const body = { email, password };
    return this.http.post<User>(LOGIN_URL, body);
  }
  signup() {}
  forgetpassword() {}
  constructor(private http: HttpClient) {}
}
