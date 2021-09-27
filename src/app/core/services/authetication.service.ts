import { User } from './../../models/user.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  users: User[];
  loggedUser: string;

  constructor(private http: HttpClient) {
    this.loadUsers().subscribe();
  }

  loadUsers(): Observable<void> {
    return this.http.get('../../../assets/data/usersData.json').pipe(
      map((users: User[]) => {
        this.users = users;
        console.log( this.users );
      })
    );
  }

  login(credentials: {user: string; password: string}): Observable<boolean> {
    this.loggedUser = this.users.find(user => user.user === credentials.user).user;
    return this.loggedUser ? of(true) : of(false);
  }
}
