import { Injectable } from "@angular/core";

import {Credential} from './credential.model'

@Injectable({
  providedIn: 'root',
 })
export class LoginService{
  constructor(){}

  onSubmitCred(username:string, password:string){
    const post :Credential = {id:"", username:"", password: ""};

  }
}
