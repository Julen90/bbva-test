import { AuthenticationService } from './../../core/services/authetication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {

  public lastLog: Date;
  public days: number;
  public hours: number;
  public minutes: number;
  public seconds: number;
  constructor(
    private  router:  Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.lastLog = localStorage.getItem('user:' + this.authService.loggedUser) ?
      new Date(localStorage.getItem('user:' + this.authService.loggedUser)) : null;
    this.getLastLogDifference();
  }

  getLastLogDifference(): void {
    const now: Date = new Date();
    if( !this.lastLog ) {
      localStorage.setItem('user:'+this.authService.loggedUser, JSON.stringify(now.toUTCString()));
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
    } else {
      const differenceInMiliseconds = now.valueOf() - this.lastLog.valueOf();
      this.days = Math.floor(differenceInMiliseconds / 86400000); // days
      this.hours = Math.floor((differenceInMiliseconds % 86400000) / 3600000); // hours
      this.minutes = Math.round(((differenceInMiliseconds % 86400000) % 3600000) / 60000); // minutes
      this.seconds = Math.floor(differenceInMiliseconds / 1000);
      localStorage.setItem('user:'+this.authService.loggedUser, JSON.stringify(now.toUTCString()));
    }
  }

  logOut() {
    this.authService.loggedUser = '';
    this.router.navigateByUrl('login');
  }

}
