import {Component, OnDestroy, OnInit} from '@angular/core'
import {NgForm} from '@angular/forms';

import {Subscription} from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit, OnDestroy{

  constructor(public loginService:AuthService){}

  isLoading = false;
  private loginSub: Subscription = new Subscription;
  public loginStage :boolean = false;
  public hide_pass = true;

  ngOnInit(){
    this.loginSub = this.loginService.getLoginStatusListener().subscribe((isSuccess:boolean)=>{
      this.loginStage = isSuccess;
    })
  }

  ngOnDestroy(){
    this.loginSub.unsubscribe();
  }

  onLogin(formIn: NgForm){
    if (formIn.invalid) {
      return ;
    }
    this.loginService.loginUser(formIn.value.username,formIn.value.password);
  }
}
