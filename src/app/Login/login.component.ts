import {Component} from '@angular/core'
import {NgForm} from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})

export class LoginComponent{

  constructor(loginService:LoginService){}
  hide_pass = true;

  onSubmitCred(formIn: NgForm){

  }
}
