import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggedinSubject: BehaviorSubject<boolean> = new BehaviorSubject(
    this.loggedIn()
  );

  constructor(private cookieServ: CookieService) {}

  loggedIn(): boolean {
    this.cookieServ.set('jwt', 'loggedout');
    return !this.cookieServ.get('jwt');
  }
  loggedInObservable(): Observable<boolean> {
    return this.loggedinSubject.asObservable();
  }
}
