import { AuthenticationService } from './../../services/authetication.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    if(!this.authService.loggedUser) {
      this.router.navigateByUrl('/login');
      return of(false);
    } else {
      return of(true);
    }
  }
}
