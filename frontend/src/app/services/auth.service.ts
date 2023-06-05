import { Injectable } from '@angular/core';
import { Path } from 'leaflet';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggedinSubject: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  constructor(private cookieServ: CookieService) {}

  
  login() {
    this.loggedinSubject.next(true);
  }
  logout() {
    this.loggedinSubject.next(false);
  }
  loggedInObservable(): Observable<boolean> {
    return this.loggedinSubject.asObservable();
  }
}
