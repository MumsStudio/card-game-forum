import {Component} from '@angular/core'
import {NgForm} from '@angular/forms';

import { RegisterService } from './register.service';


@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})

export class RegisterComponent{

  constructor(loginService:RegisterService){}
  hide_pass = true;

  onSubmitCred(formIn: NgForm){

  }
}
