import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';

import {CustomValidator} from "./custom-validator";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})

export class RegisterComponent implements OnInit{

  constructor(private authService:AuthService){}
  hide_pass = true;

  registerForm:FormGroup;

  ngOnInit(){
    this.registerForm = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      userName: new FormControl(null, {validators: [Validators.required, Validators.minLength(2)]}),
      email: new FormControl(null),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      confirmPassword: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]})
    },{validators:CustomValidator.isPasswordMatch});
  }

  onSignUp(){
    if (this.registerForm.invalid){
      return ;
    }
    this.authService.signup(this.registerForm.value.username, this.registerForm.value.password);
  }
}
