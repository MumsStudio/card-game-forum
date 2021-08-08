import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { AuthService } from '../Auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  constructor(private authService:AuthService){}
  private authListener:Subscription | undefined;
  isLogin = false;

  ngOnInit(){
    this.isLogin = this.authService.getIsAuth();
    // listen to subject in LoginService to sync changes in login stage
    this.authListener= this.authService.getLoginStatusListener().subscribe(changes=>{
      this.isLogin = changes;
    })
  }

  ngOnDestroy(){
    if (this.authListener){
      this.authListener.unsubscribe();
    }
  }

  onLogout(){
    this.authService.logout();
  }
}
