import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';

import {CustomValidator} from "./custom-validator";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})

export class RegisterComponent implements OnInit{

  constructor(private authService:AuthService, private formbuilder: FormBuilder){}
  hide_pass = true;

  registerForm:FormGroup;

  ngOnInit(){
    this.registerForm = this.formbuilder.group({
      firstName: [null],
      lastName: [null],
      userName: [null, {validators: [Validators.required, Validators.minLength(2)]}],
      email: [null],
      password: [null, {validators: [Validators.required, Validators.minLength(3)]}],
      confirmPassword: [null, {validators: [Validators.required, Validators.minLength(3)]}]
    },{validators:CustomValidator.isPasswordMatch});
  }

  onSignUp(){
    if (this.registerForm.invalid){
      return ;
    }
    this.authService.signup(this.registerForm.get("userName").value, this.registerForm.get("password").value);
  }

}
